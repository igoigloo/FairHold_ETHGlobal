import cdpClient from './cdpClient';
import { PrismaClient } from '@prisma/client';
import { parseUnits, formatUnits } from 'viem';

const prisma = new PrismaClient();

export class JointWalletService {
  private cdp = cdpClient;

  /**
   * Create embedded wallets for users and server wallet for escrow
   */
  async createUserEmbeddedWallet(email: string, userType: 'client' | 'vendor') {
    try {
      // Create embedded wallet with email authentication
      const embeddedWallet = await this.cdp.embedded.createWallet({
        authMethod: 'email',
        email,
        name: `${userType}-${email.split('@')[0]}`,
        // Embedded wallets automatically earn 4.1% USDC yield
        yieldEnabled: true,
      });

      console.log(`Created embedded wallet for ${userType}: ${embeddedWallet.address}`);

      return {
        walletAddress: embeddedWallet.address,
        walletId: embeddedWallet.id,
        authMethod: 'email',
        yieldEnabled: true,
        success: true,
      };
    } catch (error: any) {
      console.error('Failed to create embedded wallet:', error);
      throw new Error(`Embedded wallet creation failed: ${error.message}`);
    }
  }

  /**
   * Create a server wallet for agreement escrow (automated operations)
   */
  async createAgreementServerWallet(agreementId: string, clientAddress: string, vendorAddress: string) {
    try {
      // Create server wallet for automated escrow operations
      const serverWallet = await this.cdp.server.createWallet({
        name: `Escrow-${agreementId.slice(0, 8)}`,
        network: process.env.NEXT_PUBLIC_NETWORK || 'base-sepolia',
        // Server wallets are for automation, not yield generation
        yieldEnabled: false,
        policies: {
          // Only allow transfers to client and vendor addresses
          allowedRecipients: [clientAddress, vendorAddress],
          // Require confirmation for large transfers
          confirmationThreshold: parseUnits('1000', 6), // 1000 USDC
        },
      });

      console.log(`Created server escrow wallet: ${serverWallet.address}`);

      // Store wallet info in database
      await prisma.agreement.update({
        where: { id: agreementId },
        data: {
          escrowWalletAddress: serverWallet.address,
          escrowWalletId: serverWallet.id,
          escrowWalletType: 'SERVER_WALLET',
        },
      });

      // Create initial transaction record
      await prisma.transaction.create({
        data: {
          agreementId,
          transactionType: 'WALLET_CREATION',
          status: 'CONFIRMED',
          amount: 0,
          metadata: {
            walletAddress: serverWallet.address,
            walletId: serverWallet.id,
            walletType: 'SERVER_WALLET',
            clientAddress,
            vendorAddress,
          },
        },
      });

      return {
        walletAddress: serverWallet.address,
        walletId: serverWallet.id,
        walletType: 'SERVER_WALLET',
        success: true,
      };
    } catch (error: any) {
      console.error('Failed to create server wallet:', error);
      throw new Error(`Server wallet creation failed: ${error.message}`);
    }
  }

  /**
   * Transfer funds from server wallet to vendor's embedded wallet for yield
   */
  async transferToVendorEmbeddedWallet(agreementId: string, vendorEmbeddedWalletAddress: string, amount: string) {
    try {
      // Get agreement details
      const agreement = await prisma.agreement.findUnique({
        where: { id: agreementId },
      });

      if (!agreement?.escrowWalletId) {
        throw new Error('Server escrow wallet not found for agreement');
      }

      // Execute transfer from server wallet to vendor's embedded wallet
      const transfer = await this.cdp.server.transfer({
        fromWalletId: agreement.escrowWalletId,
        to: vendorEmbeddedWalletAddress,
        amount: parseUnits(amount, 6).toString(),
        token: 'usdc',
        network: process.env.NEXT_PUBLIC_NETWORK || 'base-sepolia',
      });

      console.log(`Transferred ${amount} USDC to vendor embedded wallet: ${vendorEmbeddedWalletAddress}`);

      // Record transaction in database
      await prisma.transaction.create({
        data: {
          agreementId,
          txHash: transfer.transactionHash,
          amount: parseFloat(amount),
          transactionType: 'MILESTONE_RELEASE',
          status: 'CONFIRMED',
          metadata: {
            fromWallet: agreement.escrowWalletAddress,
            toWallet: vendorEmbeddedWalletAddress,
            walletType: 'EMBEDDED_WALLET',
            yieldEligible: true, // Now vendor will earn 4.1% on this balance
            transferId: transfer.id,
          },
        },
      });

      return {
        transactionHash: transfer.transactionHash,
        transferId: transfer.id,
        amount: amount,
        vendorWillEarnYield: true,
        success: true,
      };
    } catch (error: any) {
      console.error('Transfer to vendor embedded wallet failed:', error);
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }

  /**
   * Get embedded wallet balance and yield information
   */
  async getEmbeddedWalletBalance(walletAddress: string, network = 'base-sepolia') {
    try {
      const balance = await this.cdp.embedded.getBalance({
        address: walletAddress,
        network,
        token: 'usdc',
      });

      // Get yield information for embedded wallets
      const yieldInfo = await this.cdp.embedded.getYieldInfo({
        address: walletAddress,
        token: 'usdc',
      });

      return {
        balance: formatUnits(BigInt(balance.amount), 6), // USDC has 6 decimals
        balanceWei: balance.amount,
        token: balance.symbol,
        network,
        yieldInfo: {
          currentYieldRate: '4.1%', // Embedded wallets earn 4.1%
          estimatedAnnualYield: yieldInfo.estimatedAnnualYield,
          yieldToDate: yieldInfo.accumulatedYield,
        },
      };
    } catch (error: any) {
      console.error('Failed to get embedded wallet balance:', error);
      return {
        balance: '0',
        balanceWei: '0',
        token: 'USDC',
        network,
        yieldInfo: {
          currentYieldRate: '4.1%',
          estimatedAnnualYield: '0',
          yieldToDate: '0',
        },
      };
    }
  }

  /**
   * Fund server escrow wallet from client's embedded wallet
   */
  async fundServerEscrowFromClient(agreementId: string, clientEmbeddedWalletId: string, amount: string) {
    try {
      const agreement = await prisma.agreement.findUnique({
        where: { id: agreementId },
      });

      if (!agreement?.escrowWalletAddress) {
        throw new Error('Server escrow wallet not found');
      }

      // Transfer from client's embedded wallet to server escrow wallet
      const transfer = await this.cdp.embedded.transfer({
        fromWalletId: clientEmbeddedWalletId,
        to: agreement.escrowWalletAddress,
        amount: parseUnits(amount, 6).toString(),
        token: 'usdc',
        network: process.env.NEXT_PUBLIC_NETWORK || 'base-sepolia',
      });

      // Record the deposit in database
      await prisma.transaction.create({
        data: {
          agreementId,
          txHash: transfer.transactionHash,
          amount: parseFloat(amount),
          transactionType: 'DEPOSIT',
          status: 'CONFIRMED',
          metadata: {
            fromWalletType: 'EMBEDDED_WALLET',
            toWalletType: 'SERVER_WALLET',
            fundingMethod: 'embedded_wallet_transfer',
          },
        },
      });

      // Update agreement status
      await prisma.agreement.update({
        where: { id: agreementId },
        data: {
          depositedAmount: parseFloat(amount),
          status: 'ACTIVE',
        },
      });

      return {
        escrowWallet: agreement.escrowWalletAddress,
        depositedAmount: amount,
        transactionHash: transfer.transactionHash,
        success: true,
      };
    } catch (error: any) {
      console.error('Server escrow funding failed:', error);
      throw new Error(`Funding failed: ${error.message}`);
    }
  }

  /**
   * Calculate yield earned in vendor's embedded wallet (Hackathon: Simulated)
   */
  async calculateVendorEmbeddedWalletYield(agreementId: string): Promise<number> {
    try {
      // For hackathon: Use simulated yield calculation
      if (process.env.SIMULATE_YIELD === 'true') {
        const yieldSimulation = await prisma.yieldSimulation.findFirst({
          where: {
            agreementId,
            isActive: true,
          },
        });

        if (!yieldSimulation) return 0;

        const daysSinceStart = Math.floor((Date.now() - new Date(yieldSimulation.startDate).getTime()) / (1000 * 60 * 60 * 24));

        const annualRate = parseFloat(process.env.ANNUAL_YIELD_RATE || '0.041');
        const dailyRate = annualRate / 365;
        const currentYield = Number(yieldSimulation.principalAmount) * dailyRate * daysSinceStart;

        // Update the simulation record
        await prisma.yieldSimulation.update({
          where: { id: yieldSimulation.id },
          data: {
            lastCalculated: new Date(),
            totalYieldSimulated: currentYield,
          },
        });

        return parseFloat(currentYield.toFixed(6));
      } else {
        // Production: Real Coinbase Prime yield calculation
        const agreement = await prisma.agreement.findUnique({
          where: { id: agreementId },
          include: { vendor: true },
        });
        if (!agreement || !agreement.vendor) {
          throw new Error('Vendor not found for agreement');
        }
        const yieldInfo = await this.cdp.embedded.getYieldInfo({
          address: agreement.vendor.wallet_address,
          token: 'usdc',
        });

        return parseFloat(yieldInfo.accumulatedYield || '0');
      }
    } catch (error: any) {
      console.error('Failed to calculate embedded wallet yield:', error);
      return 0;
    }
  }

  /**
   * Initialize yield simulation for hackathon demo
   */
  async startYieldSimulation(agreementId: string, principalAmount: number) {
    try {
      if (process.env.SIMULATE_YIELD === 'true') {
        await prisma.yieldSimulation.create({
          data: {
            agreementId,
            principalAmount,
            annualRate: parseFloat(process.env.ANNUAL_YIELD_RATE || '0.041'),
            startDate: new Date(),
            lastCalculated: new Date(),
            totalYieldSimulated: 0,
            isActive: true,
          },
        });

        console.log(`Started yield simulation for agreement ${agreementId}: ${principalAmount} at 4.1% APY`);
      }
    } catch (error: any) {
      console.error('Failed to start yield simulation:', error);
    }
  }
}

export const jointWalletService = new JointWalletService();
