import { NextApiRequest, NextApiResponse } from 'next';
import { agreementService } from '../../../lib/agreementService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Agreement ID is required' });
  }

  try {
    const agreement = await agreementService.getAgreementById(id);
    if (!agreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    res.status(200).json(agreement);
  } catch (error: any) {
    console.error('Failed to fetch agreement:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
