"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ArrowLeft,
  Wallet,
  RefreshCw,
  Settings,
  Lock,
  Copy,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  BarChart3,
  ExternalLink,
  Download,
  Upload,
} from "lucide-react"

export default function WalletDashboardPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferAddress, setTransferAddress] = useState("")

  // Sample wallet data - in real app this would come from API
  const walletData = {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    network: "Base Sepolia Testnet",
    status: "online",
    totalBalance: 12450.75,
    availableBalance: 2325.25,
    inEscrow: 10125.5,
    yieldEarned: 234.75,
    apy: 4.1,
  }

  const yieldProjections = {
    monthly: 91.25,
    quarterly: 273.75,
    annual: 1094.7,
  }

  const transactions = [
    {
      id: 1,
      type: "deposit",
      description: "USDC Deposit",
      amount: 15000,
      date: "2024-05-01",
      time: "14:30",
      txHash: "0x1234...abcd",
      status: "confirmed",
      gasUsed: "21,000",
      gasFee: 0.05,
    },
    {
      id: 2,
      type: "escrow",
      description: "Escrow Deposit - Sarah's Wedding",
      amount: -15000,
      date: "2024-05-01",
      time: "14:35",
      txHash: "0x5678...efgh",
      status: "confirmed",
      gasUsed: "45,000",
      gasFee: 0.12,
    },
    {
      id: 3,
      type: "yield",
      description: "Yield Payment",
      amount: 12.5,
      date: "2024-05-02",
      time: "00:00",
      txHash: "0x9abc...ijkl",
      status: "confirmed",
      gasUsed: "21,000",
      gasFee: 0.03,
    },
    {
      id: 4,
      type: "release",
      description: "Milestone Release - Initial Deposit",
      amount: 4500,
      date: "2024-05-03",
      time: "16:20",
      txHash: "0xdef0...mnop",
      status: "confirmed",
      gasUsed: "35,000",
      gasFee: 0.08,
    },
    {
      id: 5,
      type: "yield",
      description: "Yield Payment",
      amount: 11.8,
      date: "2024-05-03",
      time: "00:00",
      txHash: "0xqrst...uvwx",
      status: "confirmed",
      gasUsed: "21,000",
      gasFee: 0.03,
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "escrow":
        return <Lock className="h-4 w-4 text-blue-600" />
      case "release":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case "yield":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "transfer":
        return <Send className="h-4 w-4 text-blue-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "release":
      case "yield":
        return "text-green-600"
      case "withdraw":
      case "escrow":
        return "text-red-600"
      case "transfer":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-700" />
              <span className="text-2xl font-bold text-gray-900">FairHold</span>
            </div>
            <Button variant="outline" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wallet Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your funds, track yield, and view transaction history</p>
        </div>

        {/* Wallet Connection Card */}
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <CardTitle className="text-xl">Embedded Wallet Connected</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm text-gray-500">Wallet Address</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {walletData.address.slice(0, 10)}...{walletData.address.slice(-8)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(walletData.address)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Network</Label>
                <p className="text-sm font-medium mt-1">{walletData.network}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Status</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${walletData.totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">USDC</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${walletData.availableBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">USDC</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Escrow</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${walletData.inEscrow.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">USDC</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yield Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${walletData.yieldEarned}</div>
              <p className="text-xs text-green-600">{walletData.apy}% APY</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Yield Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your wallet funds and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-700 hover:bg-green-800 h-20 flex-col">
                        <Upload className="h-6 w-6 mb-2" />
                        Deposit USDC
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deposit USDC</DialogTitle>
                        <DialogDescription>Add funds to your FairHold wallet</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="deposit-amount">Amount (USDC)</Label>
                          <Input
                            id="deposit-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-green-700 hover:bg-green-800">Confirm Deposit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-20 flex-col bg-transparent">
                        <Download className="h-6 w-6 mb-2" />
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw USDC</DialogTitle>
                        <DialogDescription>Withdraw available funds from your wallet</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
                          <Input
                            id="withdraw-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                          />
                          <p className="text-sm text-gray-500">
                            Available: ${walletData.availableBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm Withdrawal</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-20 flex-col bg-transparent">
                        <Send className="h-6 w-6 mb-2" />
                        Transfer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Transfer USDC</DialogTitle>
                        <DialogDescription>Send USDC to another wallet address</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="transfer-address">Recipient Address</Label>
                          <Input
                            id="transfer-address"
                            placeholder="0x..."
                            value={transferAddress}
                            onChange={(e) => setTransferAddress(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="transfer-amount">Amount (USDC)</Label>
                          <Input
                            id="transfer-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Send Transfer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Yield History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Yield Tracker Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Yield Tracker</CardTitle>
                <CardDescription>Track your yield earnings and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Monthly Projection</p>
                      <p className="text-xl font-bold text-green-600">${yieldProjections.monthly}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Quarterly Projection</p>
                      <p className="text-xl font-bold text-green-600">${yieldProjections.quarterly}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Annual Projection</p>
                      <p className="text-xl font-bold text-green-600">${yieldProjections.annual}</p>
                    </div>
                  </div>

                  {/* Yield Chart Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-200">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-green-800">Yield Growth Chart</p>
                      <p className="text-sm text-green-600">
                        Current APY: {walletData.apy}% • Total Earned: ${walletData.yieldEarned}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Transaction History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(tx.type)}
                        <div>
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-gray-500">
                            {tx.date} at {tx.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getTransactionColor(tx.type)}`}>
                          {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                        </p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Transaction History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Complete record of all wallet transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposit">Deposits</TabsTrigger>
                <TabsTrigger value="withdraw">Withdrawals</TabsTrigger>
                <TabsTrigger value="escrow">Escrow</TabsTrigger>
                <TabsTrigger value="yield">Yield</TabsTrigger>
                <TabsTrigger value="transfer">Transfers</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Gas Fee</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(tx.type)}
                            <span className="capitalize">{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell className={getTransactionColor(tx.type)}>
                          {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {tx.date} {tx.time}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm">{tx.txHash}</span>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">${tx.gasFee}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
