# Wellem Capital - Business Loan Management System

## Overview

This is an advanced enterprise-level Business Loan Management System designed for Wellem Capital. The system provides a comprehensive solution for managing business loan applications, company registrations, and administrative oversight.

## Features

### 🔐 User Authentication & Authorization
- Secure login system with role-based access control
- Separate interfaces for Borrowers and Administrators
- Session management and user state persistence

### 🏢 Company Registration Module
- Comprehensive business information collection
- Multi-step registration process with validation
- Business details, owner information, and bank details capture
- Document upload capability during registration

### 📊 Borrower Dashboard
- Real-time loan application tracking
- Application status monitoring (Submitted, Verified, Approved, Disbursed)
- Loan calculator with repayment schedule generation
- Document management and upload
- Quick action buttons for common tasks

### 💼 Loan Application System
- Multi-step loan application form
- Pre-filled forms using registered company data
- Loan amount range: $10,000 - $2,000,000
- Flexible repayment terms: 6 months - 7 years
- Integrated loan calculator
- Document upload with file type validation

### 🎯 Admin Portal
- Comprehensive dashboard with key metrics
- Company registration review and approval workflow
- Loan application evaluation and approval
- Document verification and management
- Analytics and reporting capabilities
- Chart visualizations for data insights

### 📋 Document Management
- Secure document upload and storage
- Multiple file format support (PDF, DOC, DOCX, JPG, PNG)
- Document verification workflow
- File organization and retrieval

### 🎨 Modern UI/UX Design
- Responsive design optimized for all devices
- Professional financial services aesthetic
- Intuitive navigation and user experience
- Loading states and error handling
- Notification system for user feedback

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router v6 for client-side routing
- **State Management**: React Context API
- **Form Handling**: Controlled components with validation

## Project Structure

```
wellem-capital-loan-system/
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── PrivateLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── NotificationContainer.tsx
│   ├── contexts/
│   │   └── AppContext.tsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── private/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoanApplicationPage.tsx
│   │   │   ├── LoanDetailsPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── DocumentsPage.tsx
│   │   └── admin/
│   │       ├── AdminDashboardPage.tsx
│   │       ├── AdminCompaniesPage.tsx
│   │       ├── AdminLoansPage.tsx
│   │       └── AdminReportsPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Key Components

### Authentication System
- Context-based authentication with role management
- Protected routes based on user roles
- Demo credentials provided for testing:
  - **Admin**: admin@wellemcapital.com / admin123
  - **Borrower**: demo@business.com / demo123

### Loan Calculator
- Real-time calculation of monthly payments
- Interest rate: 6.5% APR
- Support for various loan terms
- Total interest and amount calculations

### Status Tracking
- Comprehensive loan status workflow
- Visual status indicators with color coding
- Real-time status updates
- Historical status tracking

### Document Management
- File upload with drag-and-drop support
- File type validation and size limits
- Document categorization
- Verification workflow

## Installation & Setup

1. **Clone/Download the project** to your local machine

2. **Install dependencies**:
   ```bash
   cd wellem-capital-loan-system
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## Usage Guide

### For Borrowers
1. **Register**: Complete the 5-step business registration process
2. **Login**: Use your credentials to access the borrower dashboard
3. **Apply**: Submit loan applications with required documents
4. **Track**: Monitor application status and loan details
5. **Manage**: Upload documents and view repayment schedules

### For Administrators
1. **Login**: Use admin credentials to access the admin dashboard
2. **Review**: Evaluate company registrations and loan applications
3. **Approve**: Process applications and update statuses
4. **Monitor**: Track overall system metrics and performance
5. **Report**: Generate analytics and administrative reports

## Security Features

- Role-based access control (RBAC)
- Form validation and sanitization
- Secure file upload handling
- Session management
- Protected API routes
- XSS protection through React's built-in escaping

## Enterprise Features

- Scalable architecture ready for backend integration
- Professional UI suitable for financial services
- Comprehensive error handling and loading states
- Responsive design for all device types
- Accessibility considerations
- Performance optimizations

## Future Enhancements

The system is designed to be easily extensible with additional features:

- Backend API integration
- Real-time notifications
- Advanced analytics and reporting
- Multi-language support
- Audit logging
- Advanced document OCR processing
- Integration with credit bureaus
- Automated risk assessment
- Payment processing integration

## Support

For questions or support regarding this system, please contact the development team or refer to the documentation provided.

---

**Built with ❤️ for Wellem Capital**

*This system demonstrates modern web development practices and enterprise-grade architecture suitable for financial services applications.*