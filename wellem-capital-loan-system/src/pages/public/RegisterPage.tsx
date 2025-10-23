import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, User, CreditCard, Phone, Mail } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CompanyRegistrationForm } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const RegisterPage: React.FC = () => {
  const { state, setCompany, addNotification } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyRegistrationForm>({
    businessName: '',
    registrationNumber: '',
    taxId: '',
    businessType: '',
    businessAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    },
    ownerDetails: {
      fullName: '',
      idNumber: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States'
      }
    },
    bankDetails: {
      bankName: '',
      accountNumber: '',
      accountName: '',
      routingNumber: ''
    }
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Check if user is logged in
    if (!state.user || state.user.role !== 'borrower') {
      navigate('/login');
    }
  }, [state.user, navigate]);

  const businessTypes = [
    'Corporation',
    'LLC',
    'Partnership',
    'Sole Proprietorship',
    'Non-Profit',
    'Other'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
        break;

      case 2:
        const addr = formData.businessAddress;
        if (!addr.street.trim()) newErrors['businessAddress.street'] = 'Street address is required';
        if (!addr.city.trim()) newErrors['businessAddress.city'] = 'City is required';
        if (!addr.state.trim()) newErrors['businessAddress.state'] = 'State is required';
        if (!addr.postalCode.trim()) newErrors['businessAddress.postalCode'] = 'Postal code is required';
        break;

      case 3:
        const owner = formData.ownerDetails;
        if (!owner.fullName.trim()) newErrors['ownerDetails.fullName'] = 'Full name is required';
        if (!owner.idNumber.trim()) newErrors['ownerDetails.idNumber'] = 'ID number is required';
        if (!owner.email.trim()) newErrors['ownerDetails.email'] = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(owner.email)) newErrors['ownerDetails.email'] = 'Email is invalid';
        if (!owner.phone.trim()) newErrors['ownerDetails.phone'] = 'Phone number is required';
        break;

      case 4:
        const ownerAddr = formData.ownerDetails.address;
        if (!ownerAddr.street.trim()) newErrors['ownerDetails.address.street'] = 'Street address is required';
        if (!ownerAddr.city.trim()) newErrors['ownerDetails.address.city'] = 'City is required';
        if (!ownerAddr.state.trim()) newErrors['ownerDetails.address.state'] = 'State is required';
        if (!ownerAddr.postalCode.trim()) newErrors['ownerDetails.address.postalCode'] = 'Postal code is required';
        break;

      case 5:
        const bank = formData.bankDetails;
        if (!bank.bankName.trim()) newErrors['bankDetails.bankName'] = 'Bank name is required';
        if (!bank.accountNumber.trim()) newErrors['bankDetails.accountNumber'] = 'Account number is required';
        if (!bank.accountName.trim()) newErrors['bankDetails.accountName'] = 'Account name is required';
        if (!bank.routingNumber.trim()) newErrors['bankDetails.routingNumber'] = 'Routing number is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...(prev as any)[keys[0]],
          [keys[1]]: value
        }
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create company record
      const newCompany = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending' as const,
        registrationDate: new Date(),
        documents: []
      };
      
      setCompany(newCompany);
      
      addNotification({
        type: 'success',
        title: 'Registration Successful',
        message: 'Your business registration has been submitted and is pending review.'
      });
      
      navigate('/app/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: 'There was an error submitting your registration. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-4 text-2xl font-bold text-neutral-900">Business Information</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Tell us about your business
              </p>
            </div>
            
            <Input
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              error={errors.businessName}
              placeholder="Enter your business name"
              leftIcon={<Building className="w-5 h-5" />}
            />

            <Input
              label="Registration Number"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              error={errors.registrationNumber}
              placeholder="Enter business registration number"
            />

            <Input
              label="Tax ID / EIN"
              name="taxId"
              value={formData.taxId}
              onChange={handleInputChange}
              error={errors.taxId}
              placeholder="Enter tax identification number"
            />

            <div className="form-group">
              <label className="form-label">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={`input ${errors.businessType ? 'input-error' : ''}`}
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && (
                <p className="form-error">{errors.businessType}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-4 text-2xl font-bold text-neutral-900">Business Address</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Where is your business located?
              </p>
            </div>

            <Input
              label="Street Address"
              name="businessAddress.street"
              value={formData.businessAddress.street}
              onChange={handleInputChange}
              error={errors['businessAddress.street']}
              placeholder="123 Main Street"
              leftIcon={<MapPin className="w-5 h-5" />}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="businessAddress.city"
                value={formData.businessAddress.city}
                onChange={handleInputChange}
                error={errors['businessAddress.city']}
                placeholder="City"
              />
              <Input
                label="State"
                name="businessAddress.state"
                value={formData.businessAddress.state}
                onChange={handleInputChange}
                error={errors['businessAddress.state']}
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                name="businessAddress.postalCode"
                value={formData.businessAddress.postalCode}
                onChange={handleInputChange}
                error={errors['businessAddress.postalCode']}
                placeholder="Postal code"
              />
              <Input
                label="Country"
                name="businessAddress.country"
                value={formData.businessAddress.country}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-4 text-2xl font-bold text-neutral-900">Owner Information</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Primary contact and business owner details
              </p>
            </div>

            <Input
              label="Full Name"
              name="ownerDetails.fullName"
              value={formData.ownerDetails.fullName}
              onChange={handleInputChange}
              error={errors['ownerDetails.fullName']}
              placeholder="Enter full name"
              leftIcon={<User className="w-5 h-5" />}
            />

            <Input
              label="ID Number"
              name="ownerDetails.idNumber"
              value={formData.ownerDetails.idNumber}
              onChange={handleInputChange}
              error={errors['ownerDetails.idNumber']}
              placeholder="Driver's license or ID number"
            />

            <Input
              label="Email"
              name="ownerDetails.email"
              type="email"
              value={formData.ownerDetails.email}
              onChange={handleInputChange}
              error={errors['ownerDetails.email']}
              placeholder="Enter email address"
              leftIcon={<Mail className="w-5 h-5" />}
            />

            <Input
              label="Phone Number"
              name="ownerDetails.phone"
              value={formData.ownerDetails.phone}
              onChange={handleInputChange}
              error={errors['ownerDetails.phone']}
              placeholder="Enter phone number"
              leftIcon={<Phone className="w-5 h-5" />}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-4 text-2xl font-bold text-neutral-900">Personal Address</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Owner's residential address
              </p>
            </div>

            <Input
              label="Street Address"
              name="ownerDetails.address.street"
              value={formData.ownerDetails.address.street}
              onChange={handleInputChange}
              error={errors['ownerDetails.address.street']}
              placeholder="123 Main Street"
              leftIcon={<MapPin className="w-5 h-5" />}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="ownerDetails.address.city"
                value={formData.ownerDetails.address.city}
                onChange={handleInputChange}
                error={errors['ownerDetails.address.city']}
                placeholder="City"
              />
              <Input
                label="State"
                name="ownerDetails.address.state"
                value={formData.ownerDetails.address.state}
                onChange={handleInputChange}
                error={errors['ownerDetails.address.state']}
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Postal Code"
                name="ownerDetails.address.postalCode"
                value={formData.ownerDetails.address.postalCode}
                onChange={handleInputChange}
                error={errors['ownerDetails.address.postalCode']}
                placeholder="Postal code"
              />
              <Input
                label="Country"
                name="ownerDetails.address.country"
                value={formData.ownerDetails.address.country}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="mx-auto h-12 w-12 text-primary-600" />
              <h2 className="mt-4 text-2xl font-bold text-neutral-900">Bank Details</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Business banking information
              </p>
            </div>

            <Input
              label="Bank Name"
              name="bankDetails.bankName"
              value={formData.bankDetails.bankName}
              onChange={handleInputChange}
              error={errors['bankDetails.bankName']}
              placeholder="Enter bank name"
              leftIcon={<CreditCard className="w-5 h-5" />}
            />

            <Input
              label="Account Number"
              name="bankDetails.accountNumber"
              value={formData.bankDetails.accountNumber}
              onChange={handleInputChange}
              error={errors['bankDetails.accountNumber']}
              placeholder="Enter account number"
            />

            <Input
              label="Account Name"
              name="bankDetails.accountName"
              value={formData.bankDetails.accountName}
              onChange={handleInputChange}
              error={errors['bankDetails.accountName']}
              placeholder="Enter account holder name"
            />

            <Input
              label="Routing Number"
              name="bankDetails.routingNumber"
              value={formData.bankDetails.routingNumber}
              onChange={handleInputChange}
              error={errors['bankDetails.routingNumber']}
              placeholder="Enter routing number"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Business Info', description: 'Basic business details' },
    { number: 2, title: 'Business Address', description: 'Location information' },
    { number: 3, title: 'Owner Info', description: 'Contact details' },
    { number: 4, title: 'Personal Address', description: 'Residential address' },
    { number: 5, title: 'Bank Details', description: 'Banking information' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Business Registration</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Register your business to apply for loans
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm
                  ${currentStep >= step.number 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-500'
                  }
                `}>
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-20 h-0.5 ml-2
                    ${currentStep > step.number ? 'bg-primary-600' : 'bg-neutral-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-neutral-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Submit Registration
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;