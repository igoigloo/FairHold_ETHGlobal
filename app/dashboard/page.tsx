"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Plus,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  Wallet,
  Activity,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"
import {
  testUsers,
  getAgreementsByUserId,
  calculateTotalYieldEarned,
  calculateTotalEscrowed,
  testTransactions,
} from "@/lib/testData"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setShowSuccessMessage(true)
    }
  }, [searchParams])

  const currentUser = testUsers[0] // Sarah Johnson as the demo user
  const userAgreements = getAgreementsByUserId(currentUser.id)
  const activeAgreements = userAgreements.filter((agreement) => agreement.status === "active")
  const completedAgreements = userAgreements.filter((agreement) => agreement.status === "completed")

  const stats = {
    activeAgreements: activeAgreements.length,
    totalEscrowed: calculateTotalEscrowed(currentUser.id),
    yieldEarned: calculateTotalYieldEarned(currentUser.id),
    completedAgreements: completedAgreements.length,
  }

  const agreements = userAgreements.slice(0, 4).map((agreement) => ({
    id: agreement.id,
    name: agreement.eventName,
    serviceType:
      agreement.eventType === "wedding"
        ? "Wedding Planning"
        : agreement.eventType === "corporate"
          ? "Corporate Event"
          : agreement.eventType === "anniversary"
            ? "Anniversary Planning"
            : "Event Planning",
    amount: agreement.totalAmount,
    status: agreement.status,
    progress: agreement.completionPercentage,
    eventDate: agreement.eventDate,
    vendor: testUsers.find((user) => user.id === agreement.vendorId)?.name || "Unknown Vendor",
  }))

  const recentTransactions = testTransactions
    .filter((tx) => userAgreements.some((agreement) => agreement.id === tx.agreementId))
    .slice(0, 3)
    .map((tx) => ({
      type: tx.type,
      amount: tx.amount,
      date: new Date(tx.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-700" />
                <span className="text-2xl font-bold text-gray-900">FairHold</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/dashboard" className="text-blue-700 font-medium border-b-2 border-blue-700 pb-4">
                  Dashboard
                </a>
                <a href="/agreements" className="text-gray-600 hover:text-gray-900 font-medium">
                  Agreements
                </a>
                <a href="/wallet" className="text-gray-600 hover:text-gray-900 font-medium">
                  Wallet
                </a>
                <a href="/help" className="text-gray-600 hover:text-gray-900 font-medium">
                  Help
                </a>
              </nav>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your agreements and track your earnings</p>
            </div>

            {showSuccessMessage && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="flex items-center justify-between">
                    <span>
                      <strong>Agreement created successfully!</strong> Your service provider has been notified and will
                      receive an invitation to accept the agreement.
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSuccessMessage(false)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agreements</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeAgreements}</div>
                  <p className="text-xs text-muted-foreground">Currently in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Escrowed</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalEscrowed.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">USDC in escrow</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yield Earned</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.yieldEarned.toFixed(2)}</div>
                  <p className="text-xs text-green-600">4.1% APY</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedAgreements}</div>
                  <p className="text-xs text-muted-foreground">Total agreements</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-700 hover:bg-blue-800" asChild>
                  <a href="/create-agreement">
                    <Plus className="h-4 w-4 mr-2" />
                    New Agreement
                  </a>
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Fund Escrow
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Recent Agreements Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Agreements</CardTitle>
                <CardDescription>Your latest service agreements and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agreement</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agreements.map((agreement) => (
                      <TableRow key={agreement.id}>
                        <TableCell className="font-medium">{agreement.name}</TableCell>
                        <TableCell>{agreement.serviceType}</TableCell>
                        <TableCell>${agreement.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              agreement.status === "active"
                                ? "default"
                                : agreement.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              agreement.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : agreement.status === "completed"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }
                          >
                            {agreement.status === "active" && <Activity className="h-3 w-3 mr-1" />}
                            {agreement.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {agreement.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={agreement.progress} className="w-16" />
                            <span className="text-sm text-muted-foreground">{agreement.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Wallet Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wallet Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Connected (Demo)</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Address: {currentUser.walletAddress.slice(0, 6)}...{currentUser.walletAddress.slice(-4)}
                  </p>
                  <p>Network: Base Sepolia</p>
                  <p>Balance: ${(stats.totalEscrowed + 2325.25).toLocaleString()} USDC</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  <Wallet className="h-4 w-4 mr-2" />
                  Manage Wallet
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            tx.type === "deposit"
                              ? "bg-blue-500"
                              : tx.type === "yield"
                                ? "bg-green-500"
                                : "bg-amber-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium capitalize">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        {tx.type === "yield" ? "+" : ""}${tx.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            {/* Yield Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Yield Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current APY</span>
                    <span className="text-lg font-bold text-green-600">4.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Projection</span>
                    <span className="text-sm font-medium">${((stats.totalEscrowed * 0.041) / 12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Projection</span>
                    <span className="text-sm font-medium">${(stats.totalEscrowed * 0.041).toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2">Yield chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
