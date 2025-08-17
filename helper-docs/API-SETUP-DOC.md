# FairHold Platform Setup Guide - Complete Service Configuration

## 🎯 **Overview**
This guide will walk you through setting up all required services for the FairHold Web3 escrow platform, including Coinbase CDP, Supabase, Vercel, and Cloudinary.

---

## 🔧 **STEP 1: COINBASE CDP CONFIGURATION**

### **1.1 Create Coinbase Developer Platform Account**

1. **Visit:** https://portal.cdp.coinbase.com/
2. **Sign up** with your email
3. **Verify** your email address
4. **Complete** developer profile

### **1.2 Create API Key**

1. **Navigate to:** API Keys section in CDP Portal
2. **Click:** "Create API Key"
3. **Name:** "FairHold Escrow Platform"
4. **Permissions:** Check all boxes:
   - ✅ View
   - ✅ Trade  
   - ✅ Transfer
   - ✅ Wallet Management
5. **Click:** "Create & Download"

### **1.3 Extract Your CDP Credentials**

```json
// Your downloaded file looks like this:
{
  "id": "231c60cf-506d-4f9d-9474-d37601bd12d4",
  "privateKey": "mh8H2c/CPsZDuQcDDFhGUeKV9rK+AIn1TZpSmwk0F1wWDNtFRNGFgQSEqJdKb8iVJKHntUKBrq8oJPnL5RqtMg=="
}
```

### **1.4 Your CDP Environment Variables**

```env
# Coinbase CDP Configuration
CDP_API_KEY_NAME="fairhold-escrow-platform"
CDP_PRIVATE_KEY="mh8H2c/CPsZDuQcDDFhGUeKV9rK+AIn1TZpSmwk0F1wWDNtFRNGFgQSEqJdKb8iVJKHntUKBrq8oJPnL5RqtMg=="
CDP_PROJECT_ID="231c60cf-506d-4f9d-9474-d37601bd12d4"

# Network Configuration  
NEXT_PUBLIC_NETWORK="base-sepolia"
NEXT_PUBLIC_USDC_ADDRESS="0x036CbD53842c5426634e7929541eC2318f3dCF7e"
```

### **1.5 Test CDP Connection**

```bash
# Test your CDP credentials
curl -X POST https://api.developer.coinbase.com/rpc/v1/showPortfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 🗄️ **STEP 2: SUPABASE DATABASE SETUP**

### **2.1 Create Supabase Project**

1. **Visit:** https://supabase.com
2. **Sign up** with GitHub or email
3. **Click:** "New Project"
4. **Fill in:**
   - Organization: Create new or use existing
   - Name: `fairhold-escrow`
   - Database Password: Generate strong password
   - Region: Choose closest to your users
5. **Click:** "Create new project"

### **2.2 Get Database Connection Details**

1. **Go to:** Settings → Database
2. **Copy:** Connection string
3. **Format:** 
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### **2.3 Setup Database Schema**

1. **Go to:** SQL Editor in Supabase dashboard
2. **Create new query**
3. **Paste and run** the following schema:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    user_type TEXT NOT NULL CHECK (user_type IN ('CLIENT', 'VENDOR', 'MEDIATOR')),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    business_name TEXT,
    contact_phone TEXT,
    website TEXT,
    description TEXT,
    kyc_status TEXT DEFAULT 'PENDING' CHECK (kyc_status IN ('PENDING', 'APPROVED', 'REJECTED', 'NOT_REQUIRED')),
    reputation_score DECIMAL DEFAULT 0.0,
    profile_image_url TEXT
);

-- Agreements table
CREATE TABLE agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_address TEXT UNIQUE,
    client_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES users(id),
    mediator_id UUID REFERENCES users(id),
    total_amount DECIMAL(18,6) NOT NULL,
    deposited_amount DECIMAL(18,6) DEFAULT 0,
    released_amount DECIMAL(18,6) DEFAULT 0,
    yield_generated DECIMAL(18,6) DEFAULT 0,
    event_type TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE,
    event_location TEXT,
    event_description TEXT,
    status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DISPUTED')),
    yield_strategy TEXT DEFAULT 'COINBASE_STAKING',
    refund_policy JSONB,
    contract_document_url TEXT,
    signed_contract_url TEXT,
    escrow_wallet_address TEXT,
    escrow_wallet_id TEXT,
    escrow_wallet_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Milestones table
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_id UUID REFERENCES agreements(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(18,6) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    is_completed BOOLEAN DEFAULT FALSE,
    is_released BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    released_at TIMESTAMP WITH TIME ZONE,
    proof_document_url TEXT,
    proof_image_url TEXT,
    notes TEXT,
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_id UUID REFERENCES agreements(id) ON DELETE CASCADE,
    tx_hash TEXT UNIQUE,
    amount DECIMAL(18,6) NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('DEPOSIT', 'MILESTONE_RELEASE', 'YIELD_DISTRIBUTION', 'REFUND', 'ADVANCE_PAYMENT', 'WALLET_CREATION', 'STAKING_DEPOSIT')),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED')),
    yield_amount DECIMAL(18,6),
    staking_period INTEGER,
    description TEXT,
    metadata JSONB,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agreement_id UUID REFERENCES agreements(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('CONTRACT', 'INVOICE', 'RECEIPT', 'PROOF_OF_COMPLETION', 'IDENTITY_DOCUMENT', 'BUSINESS_LICENSE', 'OTHER')),
    description TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agreement_id UUID REFERENCES agreements(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('MILESTONE_COMPLETED', 'PAYMENT_RECEIVED', 'AGREEMENT_CREATED', 'DISPUTE_RAISED', 'YIELD_DISTRIBUTED')),
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_agreements_client_status ON agreements(client_id, status);
CREATE INDEX idx_agreements_vendor_status ON agreements(vendor_id, status);
CREATE INDEX idx_milestones_agreement_order ON milestones(agreement_id, "order");
CREATE INDEX idx_transactions_agreement_type ON transactions(agreement_id, transaction_type);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_agreements_escrow_wallet ON agreements(escrow_wallet_address);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agreements_updated_at BEFORE UPDATE ON agreements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### **2.4 Your Supabase Environment Variables**

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_KEY="your-service-role-key-here"
```

**To find your keys:**
1. Go to Settings → API
2. Copy the URL and anon key
3. Copy service_role key (keep this secret!)

---

## ☁️ **STEP 3: VERCEL DEPLOYMENT SETUP**

### **3.1 Create Vercel Account**

1. **Visit:** https://vercel.com
2. **Sign up** with GitHub (recommended)
3. **Connect** your GitHub account
4. **Import** your FairHold repository

### **3.2 Configure Environment Variables in Vercel**

1. **Go to:** Your project dashboard on Vercel
2. **Click:** Settings → Environment Variables
3. **Add all variables** (one by one):

```env
# Coinbase CDP
CDP_API_KEY_NAME=fairhold-escrow-platform
CDP_PRIVATE_KEY=-----BEGIN EC PRIVATE KEY-----...-----END EC PRIVATE KEY-----
CDP_PROJECT_ID=your-project-id

# Database
DATABASE_URL=postgresql://postgres:...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Network
NEXT_PUBLIC_NETWORK=base-sepolia
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e

# File Storage (see Step 4)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Security
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-app.vercel.app
ENCRYPTION_KEY=your-32-character-key
```

### **3.3 Generate Security Keys**

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate ENCRYPTION_KEY  
openssl rand -hex 32
```

### **3.4 Vercel Configuration File**

Create `vercel.json` in your project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_NETWORK": "base-sepolia",
    "NEXT_PUBLIC_USDC_ADDRESS": "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database_url",
      "CDP_PRIVATE_KEY": "@cdp_private_key"
    }
  },
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

---

## 🖼️ **STEP 4: CLOUDINARY FILE STORAGE SETUP**

### **4.1 Create Cloudinary Account**

1. **Visit:** https://cloudinary.com
2. **Sign up** for free account
3. **Verify** your email
4. **Complete** account setup

### **4.2 Get Cloudinary Credentials**

1. **Go to:** Dashboard after login
2. **Find:** Account Details section
3. **Copy:**
   - Cloud Name
   - API Key  
   - API Secret

### **4.3 Configure Cloudinary Settings**

1. **Go to:** Settings → Upload
2. **Enable:** Unsigned uploads (for easier integration)
3. **Create upload preset:**
   - Name: `fairhold-documents`
   - Mode: Unsigned
   - Folder: `fairhold/`
   - Allowed formats: `jpg,png,pdf,doc,docx`
   - Max file size: `10MB`

### **4.4 Your Cloudinary Environment Variables**

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_PRESET="fairhold-documents"
```

---

## 🔐 **STEP 5: SECURITY CONFIGURATION**

### **5.1 Generate Required Security Keys**

```bash
# Generate NEXTAUTH_SECRET (32 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate ENCRYPTION_KEY (64 hex characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate API Keys for internal use
node -e "console.log('API_KEY_' + require('crypto').randomUUID().replace(/-/g, '').toUpperCase())"
```

### **5.2 Complete Security Environment Variables**

```env
# Security Configuration
NEXTAUTH_SECRET="your-generated-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000" # Change to your domain in production
ENCRYPTION_KEY="your-64-character-hex-key"
API_SECRET_KEY="your-generated-api-key"

# CORS Configuration
ALLOWED_ORIGINS="http://localhost:3000,https://your-domain.vercel.app"
```

---

## 📁 **STEP 6: COMPLETE .env.local FILE**

Create `.env.local` in your project root:

```env
# ===================================
# FAIRHOLD PLATFORM CONFIGURATION
# ===================================

# Coinbase CDP Configuration
CDP_API_KEY_NAME="fairhold-escrow-platform"
CDP_PRIVATE_KEY="-----BEGIN EC PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END EC PRIVATE KEY-----\n"
CDP_PROJECT_ID="your-project-id-here"

# Database Configuration (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_KEY="your-supabase-service-key"

# Network Configuration
NEXT_PUBLIC_NETWORK="base-sepolia"
NEXT_PUBLIC_USDC_ADDRESS="0x036CbD53842c5426634e7929541eC2318f3dCF7e"

# File Storage Configuration (Cloudinary)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
CLOUDINARY_UPLOAD_PRESET="fairhold-documents"

# Authentication & Security
NEXTAUTH_SECRET="your-generated-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
ENCRYPTION_KEY="your-64-character-encryption-key"
API_SECRET_KEY="your-generated-api-key"

# CORS & Security
ALLOWED_ORIGINS="http://localhost:3000,https://your-domain.vercel.app"

# Optional: Email Configuration (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
FROM_EMAIL="noreply@fairhold.com"
```

---

## ✅ **STEP 7: VERIFICATION & TESTING**

### **7.1 Test Database Connection**

```bash
# Install dependencies first
npm install

# Test database connection
npx prisma db pull
npx prisma generate
```

### **7.2 Test Coinbase CDP**

Create `test-cdp.js`:

```javascript
import { Coinbase } from "@coinbase/coinbase-sdk";

// Configure CDP
Coinbase.configure({
  apiKeyName: process.env.CDP_API_KEY_NAME,
  privateKey: process.env.CDP_PRIVATE_KEY,
  useServerSigner: true
});

// Test wallet creation
async function testCDP() {
  try {
    console.log("Testing CDP connection...");
    
    // Create a test wallet
    const wallet = await Wallet.create();
    console.log("✅ CDP connection successful!");
    console.log("Test wallet address:", wallet.getDefaultAddress().getId());
    
    return true;
  } catch (error) {
    console.error("❌ CDP connection failed:", error);
    return false;
  }
}

testCDP();
```

### **7.3 Test Cloudinary**

Create `test-cloudinary.js`:

```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connection successful:", result);
    return true;
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error);
    return false;
  }
}

testCloudinary();
```

### **7.4 Complete Integration Test**

```javascript
// test-all-services.js
import { testDatabase } from './lib/database.js';
import { testCDP } from './lib/cdpClient.js';
import { testCloudinary } from './lib/fileStorage.js';

async function runAllTests() {
  console.log("🧪 Running integration tests...\n");
  
  const results = {
    database: await testDatabase(),
    cdp: await testCDP(),
    cloudinary: await testCloudinary()
  };
  
  console.log("\n📊 Test Results:");
  console.log("Database:", results.database ? "✅ PASS" : "❌ FAIL");
  console.log("Coinbase CDP:", results.cdp ? "✅ PASS" : "❌ FAIL");
  console.log("Cloudinary:", results.cloudinary ? "✅ PASS" : "❌ FAIL");
  
  const allPassed = Object.values(results).every(result => result);
  console.log("\n🎯 Overall:", allPassed ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED");
  
  return allPassed;
}

runAllTests();
```

---

## 🚨 **CRITICAL SECURITY REMINDERS**

### **Never Commit These to Git:**

```gitignore
# Add to .gitignore
.env
.env.local
.env.production
.env.development
*.key
credentials.json
cdp-api-key.json

# Vercel
.vercel

# Database
*.db
*.sqlite

# Logs
*.log
```

### **Production Security Checklist:**

- [ ] All API keys stored in Vercel environment variables
- [ ] Database connection uses SSL
- [ ] CORS properly configured
- [ ] Rate limiting implemented on API routes
- [ ] Input validation on all forms
- [ ] File upload restrictions in place
- [ ] CDP keys have minimal required permissions
- [ ] Regular key rotation schedule planned

---

## 🎯 **NEXT STEPS**

1. **✅ Complete this setup guide**
2. **🎨 Use V0 to create frontend** (from previous prompt)
3. **🔧 Implement backend services** (from to-do list)
4. **🧪 Run integration tests** regularly
5. **🚀 Deploy to Vercel** when ready

**🎉 You're now ready to build your FairHold Web3 escrow platform!**