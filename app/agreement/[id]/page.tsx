"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  ArrowLeft,
  Mail,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Upload,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
} from "lucide-react"

export default function AgreementDetailPage() {
  const [releaseAmount, setReleaseAmount] = useState("")
  const [disputeReason, setDisputeReason] = useState("")

  // Sample agreement data - in real app this would come from API
  const agreement = {
    id: "AGR-001",
    name: "Sarah & Mike's Wedding",
    serviceType: "Wedding Planning",
    serviceDate: "June 15, 2024",
    location: "Downtown Convention Center",
    status: "active",
    totalAmount: 15000,
    escrowBalance: 9000,
    yieldEarned: 125.5,
    provider: {
      name: "Elegant Events LLC",
      email: "contact@elegant.com",
      wallet: "0xabcd...1234",
    },
    client: {
      name: "John Client",
      email: "john@email.com",
      wallet: "0x1234...abcd",
    },
  }

  const milestones = [
    {
      id: 1,
      name: "Initial Deposit",
      amount: 4500,
      status: "completed",
      completedDate: "April 15, 2024",
      dueDate: "April 15, 2024",
      requirements: "Venue booking confirmation",
      documents: ["venue-contract.pdf"],
    },
    {
      id: 2,
      name: "Service Confirmation",
      amount: 6000,
      status: "in-progress",
      dueDate: "May 15, 2024",
      requirements: "Vendor contracts and timeline",
      documents: [],
    },
    {
      id: 3,
      name: "Final Payment",
      amount: 4500,
      status: "pending",
      dueDate: "June 8, 2024",
      requirements: "Final preparations complete",
      documents: [],
    },
  ]

  const documents = [
    { name: "Service Agreement Contract", type: "pdf", uploadDate: "April 10, 2024", size: "2.4 MB" },
    { name: "Venue Booking Confirmation", type: "pdf", uploadDate: "April 15, 2024", size: "1.2 MB" },
    { name: "Menu Planning Document", type: "pdf", uploadDate: "April 20, 2024", size: "856 KB" },
  ]

  const transactions = [
    {
      id: 1,
      type: "Escrow Deposit",
      amount: 15000,
      date: "April 10, 2024",
      txHash: "0x1234...abcd",
      status: "confirmed",
    },
    {
      id: 2,
      type: "Milestone Release",
      amount: -4500,
      date: "April 15, 2024",
      txHash: "0x5678...efgh",
      status: "confirmed",
    },
    {
      id: 3,
      type: "Yield Payment",
      amount: 12.5,
      date: "April 30, 2024",
      txHash: "0x9abc...ijkl",
      status: "confirmed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "in-progress":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
        {/* Agreement Header */}
        <Card className="mb-8 border-l-4 border-l-blue-700">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{agreement.name}</h1>
                  <Badge className={getStatusColor(agreement.status)}>
                    {getStatusIcon(agreement.status)}
                    <span className="ml-1 capitalize">{agreement.status}</span>
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {agreement.serviceDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {agreement.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Service:</span>
                    {agreement.serviceType}
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-3">
                  <div>
                    <span className="text-sm text-gray-500">Total Value</span>
                    <p className="text-xl font-bold text-gray-900">${agreement.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Yield Earned</span>
                    <p className="text-xl font-bold text-green-600">${agreement.yieldEarned}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Message Provider
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Raise Dispute
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Raise Dispute</DialogTitle>
                      <DialogDescription>
                        Describe the issue you're experiencing with this agreement. Our mediation team will review and
                        help resolve the dispute.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dispute-reason">Reason for Dispute</Label>
                        <Textarea
                          id="dispute-reason"
                          placeholder="Please describe the issue in detail..."
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-red-600 hover:bg-red-700">Submit Dispute</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Contract
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Escrow Wallet */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Escrow Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-3xl font-bold text-gray-900">${agreement.escrowBalance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">USDC</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Yield Earned</p>
                    <p className="text-xl font-bold text-green-600">${agreement.yieldEarned}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">APY</p>
                    <p className="text-lg font-semibold text-green-600">4.1%</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Release Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Release Escrow Funds</DialogTitle>
                        <DialogDescription>
                          Release funds to the service provider upon milestone completion.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="release-amount">Amount to Release</Label>
                          <Input
                            id="release-amount"
                            type="number"
                            placeholder="Enter amount in USDC"
                            value={releaseAmount}
                            onChange={(e) => setReleaseAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-green-700 hover:bg-green-800">Confirm Release</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Provider Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{agreement.provider.name}</p>
                  <p className="text-sm text-gray-500">{agreement.provider.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wallet Address</p>
                  <p className="text-sm font-mono">{agreement.provider.wallet}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Milestone Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Milestone Timeline</CardTitle>
                <CardDescription>Track progress and manage milestone payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative">
                    {index < milestones.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          milestone.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : milestone.status === "in-progress"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {getStatusIcon(milestone.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium">{milestone.name}</h3>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status === "completed"
                              ? "Completed"
                              : milestone.status === "in-progress"
                                ? "In Progress"
                                : "Pending"}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Amount:</span> ${milestone.amount.toLocaleString()}
                          </p>
                          <p>
                            <span className="font-medium">Due:</span> {milestone.dueDate}
                          </p>
                          {milestone.completedDate && (
                            <p>
                              <span className="font-medium">Completed:</span> {milestone.completedDate}
                            </p>
                          )}
                          <p>
                            <span className="font-medium">Requirements:</span> {milestone.requirements}
                          </p>
                        </div>
                        {milestone.status === "in-progress" && (
                          <div className="mt-3 space-y-2">
                            <Button size="sm" className="bg-green-700 hover:bg-green-800">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Complete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Documents */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Documents
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.uploadDate} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agreement Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-gray-500">Days Active</p>
                    <p className="text-lg font-semibold">35</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Days Remaining</p>
                    <p className="text-lg font-semibold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All blockchain transactions related to this agreement</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.type}</TableCell>
                    <TableCell className={tx.amount > 0 ? "text-green-600" : "text-red-600"}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{tx.txHash}</span>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
