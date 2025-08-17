import { PrismaClient, AgreementStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

interface CreateAgreementData {
  clientId: string;
  vendorId: string;
  totalAmount: number;
  eventType: string;
  eventDate?: Date;
  eventLocation?: string;
  eventDescription?: string;
  milestones: {
    name: string;
    amount: number;
    dueDate?: Date;
    description?: string;
    order: number;
  }[];
}

export class AgreementService {
  /**
   * Create a new agreement and its milestones
   */
  async createAgreement(data: CreateAgreementData) {
    const { milestones, ...agreementData } = data;

    try {
      const newAgreement = await prisma.agreement.create({
        data: {
          ...agreementData,
          totalAmount: new Decimal(agreementData.totalAmount),
          status: AgreementStatus.DRAFT,
          milestones: {
            create: milestones.map((milestone) => ({
              ...milestone,
              amount: new Decimal(milestone.amount),
            })),
          },
        },
        include: {
          milestones: true,
        },
      });

      return newAgreement;
    } catch (error: any) {
      console.error('Failed to create agreement:', error);
      throw new Error(`Agreement creation failed: ${error.message}`);
    }
  }

  /**
   * Get an agreement by its ID
   */
  async getAgreementById(agreementId: string) {
    try {
      const agreement = await prisma.agreement.findUnique({
        where: { id: agreementId },
        include: {
          client: { include: { profile: true } },
          vendor: { include: { profile: true } },
          milestones: { orderBy: { order: 'asc' } },
          transactions: { orderBy: { createdAt: 'desc' } },
          documents: true,
        },
      });
      return agreement;
    } catch (error: any) {
      console.error(`Failed to retrieve agreement ${agreementId}:`, error);
      throw new Error(`Failed to retrieve agreement: ${error.message}`);
    }
  }

  /**
   * Get all agreements for a user
   */
  async getAgreementsForUser(userId: string) {
    try {
      const agreements = await prisma.agreement.findMany({
        where: {
          OR: [{ clientId: userId }, { vendorId: userId }],
        },
        include: {
          client: { include: { profile: true } },
          vendor: { include: { profile: true } },
          milestones: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return agreements;
    } catch (error: any) {
      console.error(`Failed to retrieve agreements for user ${userId}:`, error);
      throw new Error(`Failed to retrieve agreements: ${error.message}`);
    }
  }

  /**
   * Update the status of an agreement
   */
  async updateAgreementStatus(agreementId: string, status: AgreementStatus) {
    try {
      const updatedAgreement = await prisma.agreement.update({
        where: { id: agreementId },
        data: { status },
      });
      return updatedAgreement;
    } catch (error: any) {
      console.error(`Failed to update status for agreement ${agreementId}:`, error);
      throw new Error(`Failed to update agreement status: ${error.message}`);
    }
  }
}

export const agreementService = new AgreementService();
