import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface JointWalletBalanceProps {
  walletAddress: string;
  agreementId: string;
  refreshTrigger?: number;
}

export function JointWalletBalance({ walletAddress, agreementId, refreshTrigger = 0 }: JointWalletBalanceProps) {
  const [balance, setBalance] = useState<{ balance: string; yieldInfo: any } | null>(null);
  const [yieldInfo, setYieldInfo] = useState<{ principal: number; yieldAmount: number; daysPeriod: number; totalAmount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      // Fetch current balance
      const balanceResponse = await fetch(`/api/wallets/${walletAddress}/balance`);
      const balanceData = await balanceResponse.json();
      if (!balanceData.success) throw new Error(balanceData.message);
      setBalance(balanceData.balance);

      // Fetch yield information
      const yieldResponse = await fetch('/api/yield/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agreementId }),
      });
      const yieldData = await yieldResponse.json();
      if (!yieldData.success) throw new Error(yieldData.message);
      setYieldInfo(yieldData.yield);
    } catch (error: any) {
      console.error('Failed to fetch wallet data:', error);
      toast.error('Failed to fetch wallet data', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress && agreementId) {
      fetchWalletData();
    }
  }, [walletAddress, agreementId, refreshTrigger]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>💰 Escrow Wallet Balance</CardTitle>
          <Badge variant="default">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Current Balance</span>
            <p className="text-3xl font-bold">{balance?.balance || '0'} USDC</p>
          </div>

          {yieldInfo && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Simulated Yield (4.1% APY)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Principal:</span>
                  <span>{yieldInfo.principal} USDC</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Yield Earned:</span>
                  <span>+{yieldInfo.yieldAmount.toFixed(6)} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Staked:</span>
                  <span>{yieldInfo.daysPeriod} days</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-1 mt-1">
                  <span>Total Available:</span>
                  <span>{yieldInfo.totalAmount.toFixed(6)} USDC</span>
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4 text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Wallet Address:</span>
              <span className="font-mono truncate">{walletAddress}</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span>Base Sepolia</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
