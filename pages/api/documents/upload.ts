import { NextApiRequest, NextApiResponse } from 'next';
import { upload } from '../../../lib/fileStorage';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.single('file');

const handler = async (req: any, res: any) => {
  try {
    uploadMiddleware(req, res, async (err: any) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
      }

      const { agreementId, userId, category, description } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, message: 'No file provided' });
      }

      const document = await prisma.document.create({
        data: {
          agreementId,
          userId,
          category,
          description,
          fileName: file.originalname,
          fileUrl: file.path,
          fileType: file.mimetype,
          fileSize: file.size,
        },
      });

      res.status(201).json({ success: true, message: 'File uploaded successfully', document });
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during file upload',
      error: error.message,
    });
  }
};

export default handler;
