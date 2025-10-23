import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminLoansPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Loan Applications</h2>
          <p className="text-neutral-600 mb-6">
            Admin loan management page - review, approve, and manage all loan applications
          </p>
          <Button variant="secondary">
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoansPage;