import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  BarChart3
} from 'lucide-react';
import { Company, LoanApplication } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    pendingCompanies: 0,
    totalLoans: 0,
    pendingLoans: 0,
    totalAmount: 0,
    approvedAmount: 0,
    disbursedAmount: 0
  });

  const [recentCompanies, setRecentCompanies] = useState<Company[]>([]);
  const [recentLoans, setRecentLoans] = useState<LoanApplication[]>([]);

  useEffect(() => {
    // Load mock data
    const mockCompanies: Company[] = [
      {
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
        registrationDate: new Date('2024-11-01'),
        documents: []
      },
      {
        id: 'company-2',
        businessName: 'TechStart Solutions',
        registrationNumber: 'REG987654321',
        taxId: '98-7654321',
        businessType: 'LLC',
        businessAddress: {
          street: '456 Tech Boulevard',
          city: 'Silicon Valley',
          state: 'CA',
          postalCode: '94025',
          country: 'United States'
        },
        ownerDetails: {
          fullName: 'Sarah Johnson',
          idNumber: 'DL987654321',
          email: 'sarah@techstart.com',
          phone: '(555) 987-6543',
          address: {
            street: '789 Innovation Dr',
            city: 'Silicon Valley',
            state: 'CA',
            postalCode: '94025',
            country: 'United States'
          }
        },
        bankDetails: {
          bankName: 'Silicon Valley Bank',
          accountNumber: '0987654321',
          accountName: 'TechStart Solutions LLC',
          routingNumber: '987654321'
        },
        status: 'pending',
        registrationDate: new Date('2024-11-15'),
        documents: []
      }
    ];

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
        disbursementDate: new Date('2024-11-08'),
        documents: [],
        repaymentSchedule: []
      },
      {
        id: 'loan-2',
        companyId: 'company-2',
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

    setRecentCompanies(mockCompanies);
    setRecentLoans(mockLoans);
    
    setStats({
      totalCompanies: 25,
      pendingCompanies: mockCompanies.filter(c => c.status === 'pending').length,
      totalLoans: 18,
      pendingLoans: mockLoans.filter(l => l.status === 'under_review').length,
      totalAmount: 1250000,
      approvedAmount: 850000,
      disbursedAmount: 250000
    });
  }, []);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      approved: 'status-approved',
      pending: 'status-submitted',
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

  // Mock data for charts
  const mockData = {
    monthlyApplications: [12, 19, 8, 15, 22, 18, 25, 20, 16, 24, 28, 15],
    statusDistribution: [8, 3, 2, 5]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="text-neutral-600">Overview of business loan applications and company registrations</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/app/admin/companies">
            <Button variant="secondary" icon={<Users className="w-5 h-5" />}>
              Manage Companies
            </Button>
          </Link>
          <Link to="/app/admin/loans">
            <Button icon={<FileText className="w-5 h-5" />}>
              View All Loans
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Total Companies
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-neutral-900">
                    {stats.totalCompanies}
                  </div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-warning-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {stats.pendingCompanies} pending
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-success-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-neutral-500 truncate">
                  Loan Applications
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-neutral-900">
                    {stats.totalLoans}
                  </div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-warning-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {stats.pendingLoans} under review
                  </div>
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
                <dd className="text-2xl font-semibold text-neutral-900">
                  ${stats.totalAmount.toLocaleString()}
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
                  Disbursed Amount
                </dt>
                <dd className="text-2xl font-semibold text-neutral-900">
                  ${stats.disbursedAmount.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Monthly Applications</h3>
          <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-neutral-400 mb-2" />
              <p className="text-sm text-neutral-500">Chart placeholder</p>
              <p className="text-xs text-neutral-400">Monthly data visualization</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Loan Status Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-neutral-400 mb-2" />
              <p className="text-sm text-neutral-500">Chart placeholder</p>
              <p className="text-xs text-neutral-400">Status distribution visualization</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Recent Registrations</h2>
            <Link to="/app/admin/companies">
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {company.businessName}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {company.ownerDetails.fullName} • {company.businessType}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {company.registrationDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  {getStatusBadge(company.status)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Loan Applications */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
            <Link to="/app/admin/loans">
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentLoans.map((loan) => {
              const company = recentCompanies.find(c => c.id === loan.companyId);
              return (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {company?.businessName || 'Unknown Company'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      ${loan.loanAmount.toLocaleString()} • {loan.loanPurpose}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {loan.applicationDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    {getStatusBadge(loan.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/app/admin/companies">
            <Button variant="secondary" fullWidth icon={<Users className="w-5 h-5" />}>
              Review Companies
            </Button>
          </Link>
          <Link to="/app/admin/loans">
            <Button variant="secondary" fullWidth icon={<FileText className="w-5 h-5" />}>
              Review Loans
            </Button>
          </Link>
          <Button variant="secondary" fullWidth icon={<CheckCircle className="w-5 h-5" />}>
            Approve Applications
          </Button>
          <Button variant="secondary" fullWidth icon={<TrendingUp className="w-5 h-5" />}>
            Generate Reports
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;