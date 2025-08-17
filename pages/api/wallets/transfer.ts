import { NextApiRequest, NextApiResponse } from 'next';
import { jointWalletService } from '../../../lib/jointWalletService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { agreementId, vendorAddress, amount } = req.body;

    const result = await jointWalletService.transferToVendorEmbeddedWallet(agreementId, vendorAddress, amount);

    res.status(200).json(result);
  } catch (error: any) {
    console.error('Transfer API error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
