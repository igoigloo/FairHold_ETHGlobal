import { NextApiRequest, NextApiResponse } from 'next';
import { jointWalletService } from '../../../lib/jointWalletService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { agreementId, clientAddress, vendorAddress } = req.body;

    if (!agreementId || !clientAddress || !vendorAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters',
      });
    }

    const result = await jointWalletService.createAgreementServerWallet(agreementId, clientAddress, vendorAddress);

    res.status(201).json(result);
  } catch (error: any) {
    console.error('Wallet creation API error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
