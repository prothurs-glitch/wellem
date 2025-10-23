// User and Authentication Types
export interface User {
  id: string;
  email: string;
  role: 'borrower' | 'admin';
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Company/Business Information
export interface Company {
  id: string;
  businessName: string;
  registrationNumber: string;
  taxId: string;
  businessType: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  ownerDetails: {
    fullName: string;
    idNumber: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  registrationDate: Date;
  documents: Document[];
}

// Loan Types
export interface LoanApplication {
  id: string;
  companyId: string;
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number; // in months
  interestRate: number;
  monthlyRepayment: number;
  totalInterest: number;
  totalAmount: number;
  collateralDetails?: string;
  guarantorDetails?: string;
  status: LoanStatus;
  applicationDate: Date;
  reviewDate?: Date;
  approvalDate?: Date;
  disbursementDate?: Date;
  documents: Document[];
  repaymentSchedule: RepaymentSchedule[];
  notes?: string;
}

// Loan Status Types
export type LoanStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'verified' 
  | 'approved' 
  | 'rejected' 
  | 'disbursed' 
  | 'active' 
  | 'completed' 
  | 'defaulted';

// Document Types
export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verificationDate?: Date;
  notes?: string;
}

export type DocumentType = 
  | 'business_registration' 
  | 'tax_clearance' 
  | 'bank_statement' 
  | 'financial_statement' 
  | 'proof_of_address' 
  | 'identity_document'
  | 'license_permit'
  | 'collateral_document'
  | 'other';

// Repayment Schedule
export interface RepaymentSchedule {
  id: string;
  loanId: string;
  installmentNumber: number;
  dueDate: Date;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: Date;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalLoans: number;
  activeLoans: number;
  totalAmount: number;
  approvedAmount: number;
  disbursedAmount: number;
  monthlyApplications: number[];
  statusDistribution: { [key in LoanStatus]: number };
  recentApplications: LoanApplication[];
}

// Form Types
export interface CompanyRegistrationForm {
  businessName: string;
  registrationNumber: string;
  taxId: string;
  businessType: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  ownerDetails: {
    fullName: string;
    idNumber: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber: string;
  };
}

export interface LoanApplicationForm {
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  collateralDetails?: string;
  guarantorDetails?: string;
  documents: File[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Table Types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

// Filter Types
export interface FilterOptions {
  status?: LoanStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  search?: string;
}