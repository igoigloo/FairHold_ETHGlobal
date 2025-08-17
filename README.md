# ETHGlobal New York 2025
 - Flow Testnet Contract Addr: 0xfe50b0b3b0e7e77bac7f2ff6dfbafef9a11f2699 

High value event payments lock up thousands of dollars for months across multiple vendors without a neutral automated way to enforce terms, causing budget drift, cash-flow pain, surprise costs, and messy disputes.

# FairHold - Secure On-Chain Smart Escrow
FairHold is a transparent, milestone-based escrow system built on blockchain technology. With a MultiSig (multi-signature) digital wallet, it provides neutral, trustless, and secure payment solutions for high-ticket transactions and deposits with automatic refund policies and dispute resolution, so customers can have a peace in mind. In addition to the security of the funds, we enable these funds to earn a yield as there is often a lag time between the payment/deposit and the actual execution of the service.

## 🎯 Features

### Smart Contract Features
- **Milestone-based payments** - Release funds only when satisfied
- **Automatic refund policies** - Time-based cancellation windows
- **Dispute resolution** - Built-in mediation system
- **Change order support** - Vendor can request changes with payer approval
- **Auto-refund triggers** - Automatic refunds for rental deposits

## Use Cases (B2B2C)
- (B2C) Large event such as a Wedding and ETH Global Hackathon
- (B2C) Securing housing
- (B2B or B2C) Custom made to order goods or services
- (B2B) Contract or subcontract works 


```mermaid
graph TB
    %% Governance Layer
    subgraph "Governance & Upgrade Layer"
        GOV[Governance Contract<br/>DAO/Multisig Voting]
        PROXY_ADMIN[ProxyAdmin<br/>Upgrade Controller]
        TIMELOCK[TimelockController<br/>Delay Execution]
    end

    %% Core Protocol Contracts
    subgraph "Core Protocol Layer"
        FACTORY[EscrowFactory<br/>Deploy New Agreements]
        REGISTRY[ContractRegistry<br/>Address Management]
        FEE[FeeManager<br/>Protocol Fees]
    end

    %% Escrow System
    subgraph "Escrow Contract System"
        ESCROW_IMPL[EscrowImplementation<br/>Logic Contract]
        
        subgraph "Individual Escrows"
            ESC1[Escrow Proxy 1<br/>Wedding Agreement]
            ESC2[Escrow Proxy 2<br/>Wedding Agreement]
            ESC3[Escrow Proxy N<br/>Wedding Agreement]
        end
        
        MILESTONE[MilestoneManager<br/>Release Logic]
        DISPUTE[DisputeResolver<br/>Mediation Logic]
    end

    %% Multi-Sig Wallet System
    subgraph "Multi-Sig Wallet System"
        MULTISIG_FACTORY[MultiSigFactory<br/>Deploy Wallets]
        
        subgraph "Multi-Sig Instances"
            MS1[MultiSig Wallet 1<br/>Couple + Vendor]
            MS2[MultiSig Wallet 2<br/>Couple + Vendor]
            MS3[MultiSig Wallet N<br/>Couple + Vendor]
        end
        
        SIG_VALIDATOR[SignatureValidator<br/>Verification Logic]
    end

    %% Token & Payment Layer
    subgraph "Payment Layer"
        TOKEN_HANDLER[TokenHandler<br/>ERC20 Management]
        PAYMENT_SPLITTER[PaymentSplitter<br/>Fee Distribution]
        YIELD[YieldGenerator<br/>Earning Logic]
    end

    %% Access Control & Security
    subgraph "Access Control Layer"
        RBAC[RoleBasedAccessControl<br/>Permission Management]
        PAUSABLE[EmergencyPause<br/>Circuit Breaker]
        REENTRANCY[ReentrancyGuard<br/>Security Module]
    end

    %% External Interfaces
    subgraph "External Interfaces"
        ORACLE_INT[Oracle Interface<br/>Price Feeds]
        BRIDGE_INT[Bridge Interface<br/>Cross-Chain]
        PAYMASTER[Paymaster<br/>Gasless Transactions]
    end

    %% Contract Relationships
    GOV --> PROXY_ADMIN
    PROXY_ADMIN --> TIMELOCK
    TIMELOCK --> FACTORY
    TIMELOCK --> REGISTRY
    
    FACTORY --> ESCROW_IMPL
    FACTORY --> ESC1
    FACTORY --> ESC2
    FACTORY --> ESC3
    
    ESC1 --> ESCROW_IMPL
    ESC2 --> ESCROW_IMPL
    ESC3 --> ESCROW_IMPL
    
    ESCROW_IMPL --> MILESTONE
    ESCROW_IMPL --> DISPUTE
    ESCROW_IMPL --> TOKEN_HANDLER
    
    MULTISIG_FACTORY --> MS1
    MULTISIG_FACTORY --> MS2
    MULTISIG_FACTORY --> MS3
    
    MS1 --> SIG_VALIDATOR
    MS2 --> SIG_VALIDATOR
    MS3 --> SIG_VALIDATOR
    
    ESC1 --> MS1
    ESC2 --> MS2
    ESC3 --> MS3
    
    TOKEN_HANDLER --> PAYMENT_SPLITTER
    TOKEN_HANDLER --> YIELD
    
    REGISTRY --> FEE
    FEE --> PAYMENT_SPLITTER
    
    ESCROW_IMPL --> RBAC
    ESCROW_IMPL --> PAUSABLE
    ESCROW_IMPL --> REENTRANCY
    
    ESCROW_IMPL --> ORACLE_INT
    ESCROW_IMPL --> BRIDGE_INT
    ESCROW_IMPL --> PAYMASTER

    %% Upgrade Paths (dotted lines)
    PROXY_ADMIN -.-> ESCROW_IMPL
    PROXY_ADMIN -.-> MILESTONE
    PROXY_ADMIN -.-> DISPUTE
    PROXY_ADMIN -.-> TOKEN_HANDLER

    %% Styling
    classDef governance fill:#e8eaf6
    classDef core fill:#e3f2fd
    classDef escrow fill:#e0f2f1
    classDef multisig fill:#fce4ec
    classDef payment fill:#fff8e1
    classDef security fill:#ffebee
    classDef external fill:#f3e5f5

    class GOV,PROXY_ADMIN,TIMELOCK governance
    class FACTORY,REGISTRY,FEE core
    class ESCROW_IMPL,ESC1,ESC2,ESC3,MILESTONE,DISPUTE escrow
    class MULTISIG_FACTORY,MS1,MS2,MS3,SIG_VALIDATOR multisig
    class TOKEN_HANDLER,PAYMENT_SPLITTER,YIELD payment
    class RBAC,PAUSABLE,REENTRANCY security
    class ORACLE_INT,BRIDGE_INT,PAYMASTER external
    ```
    
