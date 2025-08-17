import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowLeft, CheckCircle, Star, Users } from "lucide-react"
import Link from "next/link"

export default function ProviderSignupPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-700" />
              <span className="text-2xl font-bold text-gray-900">FairHold</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join as a Service Provider</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with clients who value quality work and secure payments. Get paid faster with milestone-based
            escrow.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle className="text-lg">Guaranteed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Funds are secured in escrow before work begins. No more chasing payments or dealing with late clients.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-blue-700" />
              </div>
              <CardTitle className="text-lg">Build Your Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Transparent reviews and completion rates help you attract premium clients and command higher rates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <CardTitle className="text-lg">Quality Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with serious clients who are committed to their projects and willing to pay for quality work.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Signup Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Your Provider Profile</CardTitle>
            <CardDescription className="text-center">
              Tell us about your services and start connecting with clients today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company/Business Name</Label>
              <Input id="company" placeholder="Smith Photography" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Primary Service Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding-planning">Wedding Planning</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="venue">Venue Management</SelectItem>
                  <SelectItem value="florals">Floral Design</SelectItem>
                  <SelectItem value="music">Music/DJ Services</SelectItem>
                  <SelectItem value="construction">Construction/Renovation</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="design">Design Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Service Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your services, specialties, and what makes you unique..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Service Area</Label>
              <Input id="location" placeholder="City, State or Region" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-700 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-700 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm">
                I'd like to receive updates about new features and client opportunities
              </Label>
            </div>

            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-lg py-3">Create Provider Profile</Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/dashboard" className="text-blue-700 hover:underline">
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Join Our Growing Community</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-2">2,400+</div>
              <div className="text-gray-600">Active Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 mb-2">$2.4M+</div>
              <div className="text-gray-600">Paid to Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700 mb-2">4.8★</div>
              <div className="text-gray-600">Average Provider Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
