"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarIcon,
  Plus,
  Trash2,
  Heart,
  Building2,
  Home,
  Laptop,
} from "lucide-react"

const steps = [
  { id: 1, name: "Agreement Details", description: "Service information" },
  { id: 2, name: "Participants", description: "Client and provider details" },
  { id: 3, name: "Milestones", description: "Payment schedule" },
  { id: 4, name: "Review & Create", description: "Final confirmation" },
]

const serviceTypes = [
  { value: "wedding-planning", label: "Wedding Planning", icon: Heart },
  { value: "corporate-events", label: "Corporate Events", icon: Building2 },
  { value: "home-renovation", label: "Home Renovation", icon: Home },
  { value: "freelance-project", label: "Freelance Project", icon: Laptop },
]

const weddingTemplate = [
  {
    name: "Initial Deposit",
    amount: 4500,
    percentage: 30,
    dueDate: "6 months before event",
    requirements: "Venue booking confirmation",
  },
  {
    name: "Service Confirmation",
    amount: 6000,
    percentage: 40,
    dueDate: "3 months before event",
    requirements: "Vendor contracts and timeline",
  },
  {
    name: "Final Payment",
    amount: 4500,
    percentage: 30,
    dueDate: "1 week before event",
    requirements: "Final preparations complete",
  },
]

export default function CreateAgreementPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [serviceDate, setServiceDate] = useState<Date>()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    serviceType: "",
    projectName: "",
    location: "",
    description: "",
    clientName: "John Client",
    clientEmail: "john@email.com",
    clientWallet: "0x1234...",
    providerName: "",
    providerEmail: "",
    providerWallet: "",
    totalAmount: 15000,
  })
  const [milestones, setMilestones] = useState(weddingTemplate)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleServiceTypeChange = (value: string) => {
    setFormData({ ...formData, serviceType: value })
    if (value === "wedding-planning") {
      setMilestones(weddingTemplate)
    }
  }

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        name: "Custom Milestone",
        amount: 0,
        percentage: 0,
        dueDate: "",
        requirements: "",
      },
    ])
  }

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const updateMilestone = (index: number, field: string, value: string | number) => {
    const updated = milestones.map((milestone, i) => (i === index ? { ...milestone, [field]: value } : milestone))
    setMilestones(updated)
  }

  const handleCreateAgreement = async () => {
    setIsCreating(true)

    // Simulate API call to create agreement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would send data to backend
    console.log("[v0] Creating agreement with data:", {
      ...formData,
      serviceDate,
      milestones,
      totalAmount: milestones.reduce((sum, m) => sum + m.amount, 0),
    })

    // Navigate to dashboard with success message
    router.push("/dashboard?created=true")
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

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Agreement</h1>
          <p className="text-gray-600 mt-2">Set up a secure escrow agreement with milestone-based payments</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 && "pr-8 sm:pr-20")}>
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-full",
                        step.id < currentStep
                          ? "bg-blue-700 text-white"
                          : step.id === currentStep
                            ? "border-2 border-blue-700 bg-white text-blue-700"
                            : "border-2 border-gray-300 bg-white text-gray-500",
                      )}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-4 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          step.id <= currentStep ? "text-gray-900" : "text-gray-500",
                        )}
                      >
                        {step.name}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-8 sm:w-20",
                        step.id < currentStep ? "bg-blue-700" : "bg-gray-300",
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {/* Step 1: Agreement Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Service Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select value={formData.serviceType} onValueChange={handleServiceTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <type.icon className="h-4 w-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        placeholder="e.g., Sarah & Mike's Wedding"
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceDate">Service Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !serviceDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {serviceDate ? format(serviceDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={serviceDate} onSelect={setServiceDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Downtown Convention Center"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the service requirements and expectations..."
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Participants */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Participant Information</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Client (You)</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Name</Label>
                        <Input
                          id="clientName"
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientEmail">Email</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientWallet">Wallet Address</Label>
                        <Input id="clientWallet" value={formData.clientWallet} disabled />
                        <p className="text-sm text-gray-500">Connected wallet address</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Provider Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Service Provider</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="providerName">Name/Company</Label>
                        <Input
                          id="providerName"
                          placeholder="e.g., Elegant Events LLC"
                          value={formData.providerName}
                          onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="providerEmail">Email</Label>
                        <Input
                          id="providerEmail"
                          type="email"
                          placeholder="contact@elegant.com"
                          value={formData.providerEmail}
                          onChange={(e) => setFormData({ ...formData, providerEmail: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="providerWallet">Wallet Address</Label>
                        <Input
                          id="providerWallet"
                          placeholder="0xabcd... or they can create one"
                          value={formData.providerWallet}
                          onChange={(e) => setFormData({ ...formData, providerWallet: e.target.value })}
                        />
                        <p className="text-sm text-gray-500">Provider can create wallet during acceptance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Milestones */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Smart Milestone Builder</h2>
                  {formData.serviceType === "wedding-planning" && (
                    <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                      Wedding Planning Template
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            Milestone {index + 1}: {milestone.name}
                          </CardTitle>
                          {milestones.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMilestone(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Amount</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={milestone.amount}
                                onChange={(e) => updateMilestone(index, "amount", Number.parseInt(e.target.value) || 0)}
                              />
                              <span className="text-sm text-gray-500">({milestone.percentage}%)</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input
                              value={milestone.dueDate}
                              onChange={(e) => updateMilestone(index, "dueDate", e.target.value)}
                              placeholder="e.g., 6 months before event"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Requirements</Label>
                            <Input
                              value={milestone.requirements}
                              onChange={(e) => updateMilestone(index, "requirements", e.target.value)}
                              placeholder="What needs to be completed"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" onClick={addMilestone}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Milestone
                  </Button>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Agreement Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${milestones.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Create */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review & Create Agreement</h2>

                <div className="space-y-6">
                  {/* Agreement Summary */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-900">Agreement Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Service:</span> {formData.projectName}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {formData.serviceType}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {serviceDate ? format(serviceDate, "PPP") : "Not set"}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {formData.location}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Provider:</span> {formData.providerName}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Milestone Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Payment Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                              <p className="font-medium">{milestone.name}</p>
                              <p className="text-sm text-gray-500">{milestone.requirements}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${milestone.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">{milestone.dueDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total Agreement Value</span>
                        <span>${milestones.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agreement Terms */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Agreement Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-gray-600">
                      <ul className="space-y-2">
                        <li>• Funds will be held in secure escrow and earn 4.1% APY</li>
                        <li>• Milestone payments released upon completion verification</li>
                        <li>• Dispute resolution available through automated mediation</li>
                        <li>• Both parties protected by smart contract terms</li>
                        <li>• Service provider will be notified to accept agreement</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="bg-blue-700 hover:bg-blue-800">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleCreateAgreement} disabled={isCreating} className="bg-green-700 hover:bg-green-800">
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Agreement...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Create Agreement
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
