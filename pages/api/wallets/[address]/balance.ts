import { NextApiRequest, NextApiResponse } from 'next';
import { jointWalletService } from '../../../../lib/jointWalletService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { address } = req.query;
    const balance = await jointWalletService.getEmbeddedWalletBalance(address as string);

    res.status(200).json({ success: true, balance });
  } catch (error: any) {
    console.error('Balance fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch balance',
    });
  }
}
