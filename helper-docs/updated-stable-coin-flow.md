# Stable Coin Payment Flow Process

## Overview
A yield-generating escrow system for high-value service agreements (typically $5K-$20K) using stable coins. For hackathon simplicity, this can be implemented with a smart contract escrow, making multi-signature wallets an optional feature rather than a core requirement.

## Initial Setup
- **Client Wallet**: Client maintains their personal wallet
- **Vendor Wallet**: Vendor maintains their personal wallet  
- **Smart Escrow Contract**: Created for each agreement to hold funds securely.

## Payment Process

### 1. Initial Funding
The client deposits stable coins into the smart escrow contract covering either:
- First milestone payment only, or
- Full service amount (as specified in the agreement)

### 2. Yield Generation
- Escrowed funds are staked to generate yield. For instance, Coinbase offers yields around 4% for staking.
- All accumulated yield is designated for the vendor as additional compensation.
- Vendor's personal wallet also generates yield to incentivize on-chain participation.

### 3. Milestone Completion & Release
- When a vendor completes a milestone, the client approves the payment release from the escrow contract.
- The agreed milestone amount transfers from the escrow to the vendor's wallet.
- Process repeats for subsequent milestones.

### 4. Final Settlement
Upon full agreement completion:
- Final payment transfers to vendor's wallet
- All accumulated yield from the escrow transfers to the vendor.
- The escrow contract is closed.

## Key Benefits
- **Yield Optimization**: All generated yield provides additional vendor compensation.
- **Security**: Smart contract escrow protects both parties by holding funds until milestones are met.
- **Incentivization**: On-chain yield encourages vendor ecosystem participation.
- **Escrow Protection**: Funds remain secure until milestone completion.

## Recommended Tech Stack (Hackathon)
- **Database ORM**: Prisma.io for easy database management.
- **Database**: A free PostgreSQL provider like Supabase or Neon is recommended for quick setup. Alternatively, a local PostgreSQL instance via Docker is a solid choice.