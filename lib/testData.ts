// FairHold Platform - Comprehensive Test Data
// Realistic wedding planning scenarios for demo purposes

export interface User {
  id: string
  name: string
  email: string
  walletAddress: string
  role: "client" | "vendor" | "mediator"
  avatar: string
  joinedDate: string
  totalAgreements: number
  totalEscrowed: number
  yieldEarned: number
}

export interface Agreement {
  id: string
  clientId: string
  vendorId: string
  eventName: string
  eventType: "wedding" | "corporate" | "birthday" | "anniversary"
  eventDate: string
  location: string
  description: string
  totalAmount: number
  status: "active" | "completed" | "disputed" | "cancelled"
  createdDate: string
  escrowWalletAddress: string
  currentBalance: number
  yieldEarned: number
  completionPercentage: number
  milestones: Milestone[]
  documents: Document[]
  transactions: Transaction[]
}

export interface Milestone {
  id: string
  agreementId: string
  name: string
  description: string
  amount: number
  percentage: number
  dueDate: string
  status: "pending" | "in_progress" | "completed" | "overdue"
  completedDate?: string
  proofDocuments: string[]
  order: number
}

export interface Transaction {
  id: string
  agreementId: string
  type: "deposit" | "release" | "yield" | "refund" | "dispute"
  amount: number
  fromAddress: string
  toAddress: string
  txHash: string
  status: "pending" | "confirmed" | "failed"
  timestamp: string
  description: string
  gasUsed?: number
  gasFee?: number
}

export interface Document {
  id: string
  agreementId: string
  milestoneId?: string
  name: string
  type: "contract" | "proof" | "invoice" | "receipt" | "photo"
  url: string
  uploadedBy: string
  uploadedDate: string
  size: number
}

// Sample Users
export const testUsers: User[] = [
  {
    id: "client-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87",
    role: "client",
    avatar: "/professional-woman-smiling.png",
    joinedDate: "2024-01-15",
    totalAgreements: 3,
    totalEscrowed: 45000,
    yieldEarned: 1847.5,
  },
  {
    id: "client-2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    walletAddress: "0x8ba1f109551bD432803012645Hac136c0532925a",
    role: "client",
    avatar: "/professional-man-smiling.png",
    joinedDate: "2024-02-20",
    totalAgreements: 2,
    totalEscrowed: 28000,
    yieldEarned: 1148.0,
  },
  {
    id: "vendor-1",
    name: "Elegant Events Co",
    email: "contact@elegantevents.com",
    walletAddress: "0x9cb2f209661cE532925a4c9db96590c4C87742d35",
    role: "vendor",
    avatar: "/placeholder-fkbow.png",
    joinedDate: "2023-11-10",
    totalAgreements: 15,
    totalEscrowed: 180000,
    yieldEarned: 7380.0,
  },
  {
    id: "vendor-2",
    name: "Bloom & Blossom Florals",
    email: "hello@bloomblossomflorals.com",
    walletAddress: "0xadc3f319771dF642925a5d0eb97690d5D88853c2",
    role: "vendor",
    avatar: "/floral-design-logo.png",
    joinedDate: "2023-12-05",
    totalAgreements: 8,
    totalEscrowed: 64000,
    yieldEarned: 2624.0,
  },
  {
    id: "vendor-3",
    name: "Capture Moments Photography",
    email: "info@capturemoments.com",
    walletAddress: "0xbef4g429881eG753035b6e1fc98801e6E99964d3",
    role: "vendor",
    avatar: "/placeholder-xtb42.png",
    joinedDate: "2024-01-08",
    totalAgreements: 12,
    totalEscrowed: 96000,
    yieldEarned: 3936.0,
  },
]

// Sample Agreements
export const testAgreements: Agreement[] = [
  {
    id: "agreement-1",
    clientId: "client-1",
    vendorId: "vendor-1",
    eventName: "Sarah & Mike's Wedding",
    eventType: "wedding",
    eventDate: "2024-06-15",
    location: "Napa Valley, CA",
    description:
      "Full-service wedding planning for 150 guests including venue coordination, vendor management, and day-of coordination.",
    totalAmount: 25000,
    status: "active",
    createdDate: "2024-01-20",
    escrowWalletAddress: "0xdef5h539991fH864146c7f2gd09912f7F10075e4",
    currentBalance: 25000,
    yieldEarned: 1025.0,
    completionPercentage: 60,
    milestones: [
      {
        id: "milestone-1-1",
        agreementId: "agreement-1",
        name: "Initial Planning & Venue Deposit",
        description: "Venue selection, initial planning consultation, and venue deposit coordination",
        amount: 7500,
        percentage: 30,
        dueDate: "2024-02-15",
        status: "completed",
        completedDate: "2024-02-10",
        proofDocuments: ["doc-1", "doc-2"],
        order: 1,
      },
      {
        id: "milestone-1-2",
        agreementId: "agreement-1",
        name: "Vendor Confirmation & Menu Selection",
        description: "Finalize all vendors, menu tasting, and detailed timeline creation",
        amount: 10000,
        percentage: 40,
        dueDate: "2024-04-15",
        status: "completed",
        completedDate: "2024-04-12",
        proofDocuments: ["doc-3", "doc-4"],
        order: 2,
      },
      {
        id: "milestone-1-3",
        agreementId: "agreement-1",
        name: "Final Coordination & Day-of Services",
        description: "Final guest count, seating arrangements, and full day-of coordination",
        amount: 7500,
        percentage: 30,
        dueDate: "2024-06-10",
        status: "in_progress",
        proofDocuments: [],
        order: 3,
      },
    ],
    documents: [],
    transactions: [],
  },
  {
    id: "agreement-2",
    clientId: "client-1",
    vendorId: "vendor-2",
    eventName: "Sarah & Mike's Wedding - Florals",
    eventType: "wedding",
    eventDate: "2024-06-15",
    location: "Napa Valley, CA",
    description:
      "Complete floral design including bridal bouquet, centerpieces, ceremony arch, and reception arrangements.",
    totalAmount: 8500,
    status: "active",
    createdDate: "2024-02-01",
    escrowWalletAddress: "0xefg6i649002gI975257d8g3he10023g8G21186f5",
    currentBalance: 8500,
    yieldEarned: 348.5,
    completionPercentage: 40,
    milestones: [
      {
        id: "milestone-2-1",
        agreementId: "agreement-2",
        name: "Design Consultation & Proposal",
        description: "Initial consultation, design proposal, and flower selection",
        amount: 2550,
        percentage: 30,
        dueDate: "2024-03-01",
        status: "completed",
        completedDate: "2024-02-28",
        proofDocuments: ["doc-5"],
        order: 1,
      },
      {
        id: "milestone-2-2",
        agreementId: "agreement-2",
        name: "Final Design Approval & Ordering",
        description: "Final design approval, flower ordering, and timeline confirmation",
        amount: 3400,
        percentage: 40,
        dueDate: "2024-05-01",
        status: "in_progress",
        proofDocuments: [],
        order: 2,
      },
      {
        id: "milestone-2-3",
        agreementId: "agreement-2",
        name: "Delivery & Setup",
        description: "Flower delivery, ceremony and reception setup",
        amount: 2550,
        percentage: 30,
        dueDate: "2024-06-15",
        status: "pending",
        proofDocuments: [],
        order: 3,
      },
    ],
    documents: [],
    transactions: [],
  },
  {
    id: "agreement-3",
    clientId: "client-2",
    vendorId: "vendor-3",
    eventName: "Chen Family Anniversary Celebration",
    eventType: "anniversary",
    eventDate: "2024-08-20",
    location: "San Francisco, CA",
    description: "25th anniversary celebration photography including family portraits and event coverage.",
    totalAmount: 4500,
    status: "active",
    createdDate: "2024-03-10",
    escrowWalletAddress: "0xfgh7j759113hJ086368e9h4if21134h9H32297g6",
    currentBalance: 4500,
    yieldEarned: 184.5,
    completionPercentage: 20,
    milestones: [
      {
        id: "milestone-3-1",
        agreementId: "agreement-3",
        name: "Pre-Event Consultation",
        description: "Location scouting, shot list creation, and timeline planning",
        amount: 1350,
        percentage: 30,
        dueDate: "2024-07-01",
        status: "pending",
        proofDocuments: [],
        order: 1,
      },
      {
        id: "milestone-3-2",
        agreementId: "agreement-3",
        name: "Event Photography",
        description: "Full event coverage including family portraits and candid moments",
        amount: 1800,
        percentage: 40,
        dueDate: "2024-08-20",
        status: "pending",
        proofDocuments: [],
        order: 2,
      },
      {
        id: "milestone-3-3",
        agreementId: "agreement-3",
        name: "Photo Editing & Delivery",
        description: "Professional editing and delivery of final photo gallery",
        amount: 1350,
        percentage: 30,
        dueDate: "2024-09-05",
        status: "pending",
        proofDocuments: [],
        order: 3,
      },
    ],
    documents: [],
    transactions: [],
  },
  {
    id: "agreement-4",
    clientId: "client-1",
    vendorId: "vendor-1",
    eventName: "Johnson Corporate Retreat",
    eventType: "corporate",
    eventDate: "2024-09-15",
    location: "Lake Tahoe, CA",
    description: "Corporate retreat planning for 50 employees including venue, catering, and team building activities.",
    totalAmount: 15000,
    status: "completed",
    createdDate: "2023-12-01",
    escrowWalletAddress: "0xghi8k869224iK197479f0i5jg32245i0I43308h7",
    currentBalance: 0,
    yieldEarned: 615.0,
    completionPercentage: 100,
    milestones: [
      {
        id: "milestone-4-1",
        agreementId: "agreement-4",
        name: "Venue & Activity Planning",
        description: "Venue selection, activity coordination, and initial planning",
        amount: 4500,
        percentage: 30,
        dueDate: "2024-01-15",
        status: "completed",
        completedDate: "2024-01-10",
        proofDocuments: ["doc-6"],
        order: 1,
      },
      {
        id: "milestone-4-2",
        agreementId: "agreement-4",
        name: "Catering & Logistics",
        description: "Catering arrangements, transportation, and detailed logistics",
        amount: 6000,
        percentage: 40,
        dueDate: "2024-08-01",
        status: "completed",
        completedDate: "2024-07-28",
        proofDocuments: ["doc-7"],
        order: 2,
      },
      {
        id: "milestone-4-3",
        agreementId: "agreement-4",
        name: "Event Execution",
        description: "Full event coordination and on-site management",
        amount: 4500,
        percentage: 30,
        dueDate: "2024-09-15",
        status: "completed",
        completedDate: "2024-09-15",
        proofDocuments: ["doc-8"],
        order: 3,
      },
    ],
    documents: [],
    transactions: [],
  },
]

// Sample Transactions
export const testTransactions: Transaction[] = [
  {
    id: "tx-1",
    agreementId: "agreement-1",
    type: "deposit",
    amount: 25000,
    fromAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87",
    toAddress: "0xdef5h539991fH864146c7f2gd09912f7F10075e4",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
    status: "confirmed",
    timestamp: "2024-01-20T10:30:00Z",
    description: "Initial escrow deposit for Sarah & Mike's Wedding",
    gasUsed: 21000,
    gasFee: 0.0015,
  },
  {
    id: "tx-2",
    agreementId: "agreement-1",
    type: "release",
    amount: 7500,
    fromAddress: "0xdef5h539991fH864146c7f2gd09912f7F10075e4",
    toAddress: "0x9cb2f209661cE532925a4c9db96590c4C87742d35",
    txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g",
    status: "confirmed",
    timestamp: "2024-02-10T14:45:00Z",
    description: "Milestone 1 completion - Initial Planning & Venue Deposit",
    gasUsed: 21000,
    gasFee: 0.0012,
  },
  {
    id: "tx-3",
    agreementId: "agreement-1",
    type: "yield",
    amount: 102.5,
    fromAddress: "0x0000000000000000000000000000000000000000",
    toAddress: "0xdef5h539991fH864146c7f2gd09912f7F10075e4",
    txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h",
    status: "confirmed",
    timestamp: "2024-02-28T00:00:00Z",
    description: "Monthly yield payment - 4.1% APY",
    gasUsed: 0,
    gasFee: 0,
  },
  {
    id: "tx-4",
    agreementId: "agreement-1",
    type: "release",
    amount: 10000,
    fromAddress: "0xdef5h539991fH864146c7f2gd09912f7F10075e4",
    toAddress: "0x9cb2f209661cE532925a4c9db96590c4C87742d35",
    txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i",
    status: "confirmed",
    timestamp: "2024-04-12T16:20:00Z",
    description: "Milestone 2 completion - Vendor Confirmation & Menu Selection",
    gasUsed: 21000,
    gasFee: 0.0018,
  },
  {
    id: "tx-5",
    agreementId: "agreement-2",
    type: "deposit",
    amount: 8500,
    fromAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87",
    toAddress: "0xefg6i649002gI975257d8g3he10023g8G21186f5",
    txHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j",
    status: "confirmed",
    timestamp: "2024-02-01T09:15:00Z",
    description: "Initial escrow deposit for Wedding Florals",
    gasUsed: 21000,
    gasFee: 0.0014,
  },
  {
    id: "tx-6",
    agreementId: "agreement-2",
    type: "release",
    amount: 2550,
    fromAddress: "0xefg6i649002gI975257d8g3he10023g8G21186f5",
    toAddress: "0xadc3f319771dF642925a5d0eb97690d5D88853c2",
    txHash: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k",
    status: "confirmed",
    timestamp: "2024-02-28T11:30:00Z",
    description: "Milestone 1 completion - Design Consultation & Proposal",
    gasUsed: 21000,
    gasFee: 0.0016,
  },
]

// Sample Documents
export const testDocuments: Document[] = [
  {
    id: "doc-1",
    agreementId: "agreement-1",
    milestoneId: "milestone-1-1",
    name: "Venue Contract - Napa Valley Estate",
    type: "contract",
    url: "/wedding-venue-contract.png",
    uploadedBy: "vendor-1",
    uploadedDate: "2024-02-10T10:00:00Z",
    size: 2048576,
  },
  {
    id: "doc-2",
    agreementId: "agreement-1",
    milestoneId: "milestone-1-1",
    name: "Initial Planning Meeting Photos",
    type: "photo",
    url: "/wedding-planning-meeting.png",
    uploadedBy: "vendor-1",
    uploadedDate: "2024-02-10T14:30:00Z",
    size: 5242880,
  },
  {
    id: "doc-3",
    agreementId: "agreement-1",
    milestoneId: "milestone-1-2",
    name: "Vendor Confirmation Letters",
    type: "contract",
    url: "/placeholder-supno.png",
    uploadedBy: "vendor-1",
    uploadedDate: "2024-04-12T09:15:00Z",
    size: 1536000,
  },
  {
    id: "doc-4",
    agreementId: "agreement-1",
    milestoneId: "milestone-1-2",
    name: "Menu Tasting Photos & Selection",
    type: "photo",
    url: "/wedding-menu-tasting.png",
    uploadedBy: "vendor-1",
    uploadedDate: "2024-04-12T15:45:00Z",
    size: 7340032,
  },
  {
    id: "doc-5",
    agreementId: "agreement-2",
    milestoneId: "milestone-2-1",
    name: "Floral Design Proposal",
    type: "contract",
    url: "/wedding-floral-proposal.png",
    uploadedBy: "vendor-2",
    uploadedDate: "2024-02-28T13:20:00Z",
    size: 3145728,
  },
]

// Yield Tracking Data
export const yieldTrackingData = [
  { month: "Jan 2024", totalEscrowed: 25000, yieldEarned: 85.42, cumulativeYield: 85.42 },
  { month: "Feb 2024", totalEscrowed: 33500, yieldEarned: 114.58, cumulativeYield: 200.0 },
  { month: "Mar 2024", totalEscrowed: 38000, yieldEarned: 130.0, cumulativeYield: 330.0 },
  { month: "Apr 2024", totalEscrowed: 38000, yieldEarned: 130.0, cumulativeYield: 460.0 },
  { month: "May 2024", totalEscrowed: 38000, yieldEarned: 130.0, cumulativeYield: 590.0 },
]

// Platform Statistics
export const platformStats = {
  totalAgreements: 156,
  activeAgreements: 89,
  completedAgreements: 67,
  totalValueLocked: 2450000,
  totalYieldDistributed: 100450,
  averageYieldAPY: 4.1,
  totalUsers: 324,
  totalVendors: 89,
  averageAgreementValue: 15705,
}

// Wedding Milestone Templates
export const weddingMilestoneTemplates = {
  standard: [
    {
      name: "Initial Planning & Venue Deposit",
      percentage: 30,
      description: "Venue selection, initial planning consultation, and venue deposit coordination",
    },
    {
      name: "Vendor Confirmation & Menu Selection",
      percentage: 40,
      description: "Finalize all vendors, menu tasting, and detailed timeline creation",
    },
    {
      name: "Final Coordination & Day-of Services",
      percentage: 30,
      description: "Final guest count, seating arrangements, and full day-of coordination",
    },
  ],
  photography: [
    {
      name: "Pre-Wedding Consultation",
      percentage: 30,
      description: "Engagement session, shot list creation, and timeline planning",
    },
    {
      name: "Wedding Day Photography",
      percentage: 50,
      description: "Full wedding day coverage including ceremony and reception",
    },
    {
      name: "Photo Editing & Delivery",
      percentage: 20,
      description: "Professional editing and delivery of final photo gallery",
    },
  ],
  florals: [
    {
      name: "Design Consultation & Proposal",
      percentage: 30,
      description: "Initial consultation, design proposal, and flower selection",
    },
    {
      name: "Final Design Approval & Ordering",
      percentage: 40,
      description: "Final design approval, flower ordering, and timeline confirmation",
    },
    { name: "Delivery & Setup", percentage: 30, description: "Flower delivery, ceremony and reception setup" },
  ],
}

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return testUsers.find((user) => user.id === id)
}

export const getAgreementById = (id: string): Agreement | undefined => {
  return testAgreements.find((agreement) => agreement.id === id)
}

export const getAgreementsByUserId = (userId: string): Agreement[] => {
  return testAgreements.filter((agreement) => agreement.clientId === userId || agreement.vendorId === userId)
}

export const getTransactionsByAgreementId = (agreementId: string): Transaction[] => {
  return testTransactions.filter((transaction) => transaction.agreementId === agreementId)
}

export const getDocumentsByAgreementId = (agreementId: string): Document[] => {
  return testDocuments.filter((document) => document.agreementId === agreementId)
}

export const calculateTotalYieldEarned = (userId: string): number => {
  const userAgreements = getAgreementsByUserId(userId)
  return userAgreements.reduce((total, agreement) => total + agreement.yieldEarned, 0)
}

export const calculateTotalEscrowed = (userId: string): number => {
  const userAgreements = getAgreementsByUserId(userId)
  return userAgreements
    .filter((agreement) => agreement.status === "active")
    .reduce((total, agreement) => total + agreement.currentBalance, 0)
}

// Mock API delay function for realistic demo
export const mockApiDelay = (ms = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
