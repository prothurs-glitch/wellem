import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Download
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Company, LoanApplication } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const DashboardPage: React.FC = () => {
  const { state, setCompany } = useApp();
  const [company, setLocalCompany] = useState<Company | null>(state.company);
  const [recentLoans, setRecentLoans] = useState<LoanApplication[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    activeLoans: 0,
    totalAmount: 0,
    approvedAmount: 0
  });

  useEffect(() => {
    // Load mock data if company is not set
    if (!state.company) {
      const mockCompany: Company = {
        id: 'company-1',
        businessName: 'ABC Manufacturing Inc.',
        registrationNumber: 'REG123456789',
        taxId: '12-3456789',
        businessType: 'Corporation',
        businessAddress: {
          street: '123 Industrial Ave',
          city: 'Manufacturing City',
          state: 'CA',
          postalCode: '90210',
          country: 'United States'
        },
        ownerDetails: {
          fullName: 'John Smith',
          idNumber: 'DL123456789',
          email: 'john@abcmfg.com',
          phone: '(555) 123-4567',
          address: {
            street: '456 Residential St',
            city: 'Manufacturing City',
            state: 'CA',
            postalCode: '90210',
            country: 'United States'
          }
        },
        bankDetails: {
          bankName: 'First National Bank',
          accountNumber: '1234567890',
          accountName: 'ABC Manufacturing Inc.',
          routingNumber: '123456789'
        },
        status: 'approved',
        registrationDate: new Date('2024-01-15'),
        documents: []
      };
      setCompany(mockCompany);
      setLocalCompany(mockCompany);
    } else {
      setLocalCompany(state.company);
    }

    // Load mock loan data
    const mockLoans: LoanApplication[] = [
      {
        id: 'loan-1',
        companyId: 'company-1',
        loanAmount: 250000,
        loanPurpose: 'Equipment Purchase',
        loanTerm: 36,
        interestRate: 6.5,
        monthlyRepayment: 7728.45,
        totalInterest: 28424.20,
        totalAmount: 278424.20,
        status: 'approved',
        applicationDate: new Date('2024-11-01'),
        approvalDate: new Date('2024-11-05'),
        documents: [],
        repaymentSchedule: []
      },
      {
        id: 'loan-2',
        companyId: 'company-1',
        loanAmount: 100000,
        loanPurpose: 'Working Capital',
        loanTerm: 24,
        interestRate: 7.0,
        monthlyRepayment: 4517.70,
        totalInterest: 8424.80,
        totalAmount: 108424.80,
        status: 'under_review',
        applicationDate: new Date('2024-11-15'),
        documents: [],
        repaymentSchedule: []
      }
    ];

    setRecentLoans(mockLoans);
    setStats({
      totalApplications: mockLoans.length,
      activeLoans: mockLoans.filter(loan => ['approved', 'active', 'disbursed'].includes(loan.status)).length,
      totalAmount: mockLoans.reduce((sum, loan) => sum + loan.loanAmount, 0),
      approvedAmount: mockLoans.filter(loan => loan.status === 'approved').reduce((sum, loan) => sum + loan.loanAmount, 0)
    });
  }, [state.company, setCompany]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-error-600" />;
      default:
        return <FileText className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      approved: 'status-approved',
      under_review: 'status-submitted',
      rejected: 'status-rejected',
      active: 'status-approved',
      disbursed: 'status-approved'
    };

    return (
      <span className={`status-badge ${statusClasses[status as keyof typeof statusClasses] || 'status-submitted'}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {company?.ownerDetails.fullName || 'Business Owner'}!
        </h1>
        <p className="text-primary-100 mb-4">
          {company?.businessName || 'Your Business'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/app/apply" className="flex-1">
            <Button variant="secondary" fullWidth icon={<Plus className="w-5 h-5" />}>
              Apply for New Loan
            </Button>
          </Link>
          <Link to="/app/documents" className="flex-1">
            <Button variant="ghost" fullWidth className="text-white border-white hover:bg-white hover:text-primary-800">
              Manage Documents
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Total Applications
                </dt>
                <dd className="text-lg font-medium text-neutral-900">
                  {stats.totalApplications}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-success-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Active Loans
                </dt>
                <dd className="text-lg font-medium text-neutral-900">
                  {stats.activeLoans}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-warning-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Total Requested
                </dt>
                <dd className="text-lg font-medium text-neutral-900">
                  ${stats.totalAmount.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-success-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Approved Amount
                </dt>
                <dd className="text-lg font-medium text-neutral-900">
                  ${stats.approvedAmount.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
          <Link to="/app/loans">
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {recentLoans.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No applications yet</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Get started by applying for your first business loan.
            </p>
            <div className="mt-6">
              <Link to="/app/apply">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Apply for Loan
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="space-y-4">
              {recentLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(loan.status)}
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {loan.loanPurpose}
                      </p>
                      <p className="text-sm text-neutral-500">
                        ${loan.loanAmount.toLocaleString()} • {loan.loanTerm} months
                      </p>
                      <p className="text-xs text-neutral-400">
                        Applied {loan.applicationDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(loan.status)}
                    <Link to={`/app/loans/${loan.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Company Status */}
      {company && company.status !== 'approved' && (
        <Card>
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-8 w-8 text-warning-600" />
            <div>
              <h3 className="text-lg font-medium text-neutral-900">
                Company Registration Status
              </h3>
              <p className="text-sm text-neutral-500">
                Your business registration is currently under review. You'll be able to apply for loans once approved.
              </p>
            </div>
            <div className="ml-auto">
              {getStatusBadge(company.status)}
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/app/apply">
            <Button variant="secondary" fullWidth icon={<Plus className="w-5 h-5" />}>
              Apply for Loan
            </Button>
          </Link>
          <Link to="/app/documents">
            <Button variant="secondary" fullWidth icon={<FileText className="w-5 h-5" />}>
              Upload Documents
            </Button>
          </Link>
          <Button variant="secondary" fullWidth icon={<Download className="w-5 h-5" />}>
            Download Reports
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;