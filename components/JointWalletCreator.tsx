import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

interface JointWalletCreatorProps {
  agreementId: string;
  clientAddress: string;
  vendorAddress: string;
  onWalletCreated: (walletInfo: any) => void;
}

export function JointWalletCreator({ agreementId, clientAddress, vendorAddress, onWalletCreated }: JointWalletCreatorProps) {
  const [creating, setCreating] = useState(false);
  const [walletInfo, setWalletInfo] = useState<{ walletAddress: string } | null>(null);

  const handleCreateWallet = async () => {
    setCreating(true);
    try {
      const response = await fetch('/api/wallets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreementId,
          clientAddress,
          vendorAddress,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setWalletInfo(result);
        onWalletCreated(result);
        toast.success('Joint escrow wallet created successfully!');
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error('Wallet creation failed:', error);
      toast.error('Failed to create joint wallet', {
        description: error.message,
      });
    } finally {
      setCreating(false);
    }
  };

  if (walletInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>✅ Joint Escrow Wallet Created</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wallet Address:</span>
              <span className="font-mono text-sm">{walletInfo.walletAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span>Base Sepolia</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => {
              navigator.clipboard.writeText(walletInfo.walletAddress);
              toast.success('Wallet address copied!');
            }}
          >
            Copy Address
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Joint Escrow Wallet</CardTitle>
        <CardDescription>A secure CDP wallet will be created to hold escrow funds for this agreement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Client:</span>
              <span className="font-mono text-sm">{clientAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Vendor:</span>
              <span className="font-mono text-sm">{vendorAddress}</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Security Features:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>🔐 Coinbase CDP managed private keys</li>
              <li>📈 Automatic 4.1% USDC yield simulation</li>
              <li>🛡️ Enterprise-grade security infrastructure</li>
              <li>⚡ Single-signature fund releases</li>
            </ul>
          </div>
          <Button onClick={handleCreateWallet} disabled={creating || !agreementId || !clientAddress || !vendorAddress} className="w-full">
            {creating ? 'Creating Secure Wallet...' : 'Create Joint Escrow Wallet'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
