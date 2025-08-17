import { NextApiRequest, NextApiResponse } from 'next';
import { agreementService } from '../../../lib/agreementService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await agreementService.createAgreement(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Agreement creation API error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
