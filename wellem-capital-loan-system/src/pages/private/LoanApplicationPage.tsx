import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, DollarSign, Clock, FileText } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { LoanApplicationForm } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const LoanApplicationPage: React.FC = () => {
  const { state, addNotification } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoanApplicationForm>({
    loanAmount: 0,
    loanPurpose: '',
    loanTerm: 12,
    collateralDetails: '',
    guarantorDetails: '',
    documents: []
  });
  const [calculations, setCalculations] = useState({
    interestRate: 6.5,
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Check if company is approved
    if (!state.company || state.company.status !== 'approved') {
      navigate('/app/dashboard');
    }
  }, [state.company, navigate]);

  useEffect(() => {
    // Calculate loan details
    if (formData.loanAmount > 0 && formData.loanTerm > 0) {
      const principal = formData.loanAmount;
      const rate = calculations.interestRate / 100 / 12; // Monthly rate
      const n = formData.loanTerm; // Number of payments

      if (rate === 0) {
        // Simple division if no interest
        const monthlyPayment = principal / n;
        setCalculations(prev => ({
          ...prev,
          monthlyPayment,
          totalInterest: 0,
          totalAmount: principal
        }));
      } else {
        const monthlyPayment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
        const totalAmount = monthlyPayment * n;
        const totalInterest = totalAmount - principal;

        setCalculations(prev => ({
          ...prev,
          monthlyPayment,
          totalInterest,
          totalAmount
        }));
      }
    }
  }, [formData.loanAmount, formData.loanTerm, calculations.interestRate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loanAmount' || name === 'loanTerm' ? Number(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.loanAmount || formData.loanAmount < 10000) {
      newErrors.loanAmount = 'Minimum loan amount is $10,000';
    }
    if (!formData.loanPurpose.trim()) {
      newErrors.loanPurpose = 'Loan purpose is required';
    }
    if (!formData.loanTerm || formData.loanTerm < 6) {
      newErrors.loanTerm = 'Minimum term is 6 months';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: 'success',
        title: 'Application Submitted',
        message: 'Your loan application has been submitted and is under review.'
      });
      
      navigate('/app/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your application. Please try again.'
      });
    }
  };

  const termOptions = [
    { value: 6, label: '6 months' },
    { value: 12, label: '1 year' },
    { value: 24, label: '2 years' },
    { value: 36, label: '3 years' },
    { value: 48, label: '4 years' },
    { value: 60, label: '5 years' },
    { value: 72, label: '6 years' },
    { value: 84, label: '7 years' }
  ];

  const purposeOptions = [
    'Working Capital',
    'Equipment Purchase',
    'Inventory',
    'Real Estate',
    'Business Expansion',
    'Debt Consolidation',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Apply for Business Loan</h1>
        <p className="text-neutral-600">
          Fill out the form below to submit your loan application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <DollarSign className="mx-auto h-12 w-12 text-primary-600" />
                <h2 className="mt-4 text-xl font-semibold text-neutral-900">Loan Details</h2>
              </div>

              <Input
                label="Loan Amount"
                name="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={handleInputChange}
                error={errors.loanAmount}
                placeholder="Enter loan amount"
                helperText="Minimum: $10,000 • Maximum: $2,000,000"
                leftIcon={<DollarSign className="w-5 h-5" />}
              />

              <div className="form-group">
                <label className="form-label">Loan Purpose</label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className={`input ${errors.loanPurpose ? 'input-error' : ''}`}
                >
                  <option value="">Select loan purpose</option>
                  {purposeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.loanPurpose && (
                  <p className="form-error">{errors.loanPurpose}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Loan Term</label>
                <select
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                  className={`input ${errors.loanTerm ? 'input-error' : ''}`}
                >
                  {termOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.loanTerm && (
                  <p className="form-error">{errors.loanTerm}</p>
                )}
              </div>

              <Input
                label="Collateral Details (Optional)"
                name="collateralDetails"
                type="text"
                value={formData.collateralDetails}
                onChange={handleInputChange}
                placeholder="Describe any collateral you're offering"
                helperText="Equipment, real estate, or other assets"
              />

              <Input
                label="Guarantor Details (Optional)"
                name="guarantorDetails"
                type="text"
                value={formData.guarantorDetails}
                onChange={handleInputChange}
                placeholder="Name and details of any guarantor"
                helperText="Person or entity guaranteeing the loan"
              />

              {/* Document Upload */}
              <div>
                <label className="form-label">Supporting Documents</label>
                <div className="mt-1">
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-neutral-400" />
                    <div className="mt-4">
                      <label htmlFor="documents" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-neutral-900">
                          Upload documents
                        </span>
                        <span className="mt-1 block text-sm text-neutral-500">
                          PDF, DOC, DOCX, JPG, PNG files up to 10MB each
                        </span>
                        <input
                          id="documents"
                          name="documents"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                  
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                          <span className="text-sm text-neutral-900">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-error-600 hover:text-error-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/app/dashboard')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Calculator & Summary */}
        <div className="space-y-6">
          {/* Loan Calculator */}
          <Card>
            <div className="flex items-center mb-4">
              <Calculator className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-neutral-900">Loan Calculator</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Interest Rate:</span>
                <span className="text-sm font-medium text-neutral-900">
                  {calculations.interestRate}% APR
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Loan Amount:</span>
                <span className="text-sm font-medium text-neutral-900">
                  ${formData.loanAmount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Term:</span>
                <span className="text-sm font-medium text-neutral-900">
                  {formData.loanTerm} months
                </span>
              </div>
              
              <hr />
              
              <div className="flex justify-between">
                <span className="text-base font-medium text-neutral-900">Monthly Payment:</span>
                <span className="text-lg font-bold text-primary-600">
                  ${calculations.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Total Interest:</span>
                <span className="text-sm font-medium text-neutral-900">
                  ${calculations.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Total Amount:</span>
                <span className="text-sm font-medium text-neutral-900">
                  ${calculations.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </Card>

          {/* Required Documents */}
          <Card>
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-neutral-900">Required Documents</h3>
            </div>
            
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Business registration certificate
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Tax clearance certificate
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Bank statements (3 months)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Financial statements
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Proof of address
              </li>
            </ul>
          </Card>

          {/* Processing Time */}
          <Card>
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-neutral-900">Processing Time</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Initial Review:</span>
                <span className="text-neutral-900">1-2 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Document Verification:</span>
                <span className="text-neutral-900">2-3 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Final Decision:</span>
                <span className="text-neutral-900">3-5 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Fund Disbursement:</span>
                <span className="text-neutral-900">1-2 business days</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;