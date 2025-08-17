import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface FundTransferManagerProps {
  agreementId: string;
  vendorAddress: string;
  availableAmount: number;
  yieldAmount: number;
  onTransferComplete: () => void;
}

export function FundTransferManager({
  agreementId,
  vendorAddress,
  availableAmount,
  yieldAmount,
  onTransferComplete,
}: FundTransferManagerProps) {
  const [transferring, setTransferring] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');

  const totalTransferAmount = parseFloat(transferAmount || '0') + yieldAmount;

  const handleTransfer = async () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast.error('Please enter a valid transfer amount');
      return;
    }

    if (parseFloat(transferAmount) > availableAmount) {
      toast.error('Transfer amount exceeds available balance');
      return;
    }

    setTransferring(true);
    try {
      const response = await fetch('/api/wallets/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreementId,
          vendorAddress,
          amount: transferAmount,
          yieldAmount: yieldAmount.toString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Successfully transferred ${result.amount} USDC to vendor!`);
        onTransferComplete();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error('Transfer failed:', error);
      toast.error('Transfer failed. Please try again.', {
        description: error.message,
      });
    } finally {
      setTransferring(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>💸 Release Funds to Vendor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vendor Address:</span>
              <span className="font-mono truncate">{vendorAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Balance:</span>
              <span>{availableAmount} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Earned Yield:</span>
              <span className="text-green-600">+{yieldAmount.toFixed(6)} USDC</span>
            </div>
          </div>
          <div className="space-y-2">
            <Input
              id="transferAmount"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="0.00"
              max={availableAmount}
              step="0.01"
            />
            {transferAmount && (
              <Alert>
                <AlertTitle>Transfer Summary</AlertTitle>
                <AlertDescription>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span>{transferAmount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yield Bonus:</span>
                      <span>+{yieldAmount.toFixed(6)} USDC</span>
                    </div>
                    <div className="flex justify-between font-bold border-t mt-1 pt-1">
                      <span>Total to Vendor:</span>
                      <span>{totalTransferAmount.toFixed(6)} USDC</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
          <Button
            onClick={handleTransfer}
            disabled={transferring || !transferAmount || parseFloat(transferAmount) <= 0}
            className="w-full"
          >
            {transferring ? 'Processing Transfer...' : `Transfer ${totalTransferAmount.toFixed(2)} USDC`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
