import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Reports & Analytics</h2>
          <p className="text-neutral-600 mb-6">
            Admin reports page - generate and view detailed analytics and reports
          </p>
          <Button variant="secondary">
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminReportsPage;