import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Document Management</h2>
          <p className="text-neutral-600 mb-6">
            Document upload and management page - upload, view, and manage all required documents
          </p>
          <Button variant="secondary">
            Go Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DocumentsPage;