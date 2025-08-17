import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface FileUploadProps {
  agreementId: string;
  userId: string;
  onUploadComplete: (document: any) => void;
}

export function FileUpload({ agreementId, userId, onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('agreementId', agreementId);
    formData.append('userId', userId);
    formData.append('category', 'CONTRACT'); // Example category
    formData.append('description', 'Agreement contract'); // Example description

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/documents/upload', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          const result = JSON.parse(xhr.responseText);
          toast.success('File uploaded successfully!');
          onUploadComplete(result.document);
          setFile(null);
        } else {
          const error = JSON.parse(xhr.responseText);
          throw new Error(error.message || 'File upload failed');
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        toast.error('An error occurred during the upload. Please try again.');
        setUploading(false);
      };

      xhr.send(formData);
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error('Upload failed', {
        description: error.message,
      });
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload the agreement contract or other relevant documents.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="file" onChange={handleFileChange} disabled={uploading} />
          {uploading && <Progress value={progress} className="w-full" />}
          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
            {uploading ? `Uploading... ${progress}%` : 'Upload File'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
