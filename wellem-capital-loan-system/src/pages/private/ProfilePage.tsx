import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Company Profile</h2>
          <p className="text-neutral-600 mb-6">
            Company profile management page - edit business details, bank information, and contact info
          </p>
          <Button variant="secondary">
            Go Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;