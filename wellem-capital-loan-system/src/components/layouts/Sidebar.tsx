import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  CreditCard, 
  User, 
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  X
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { state } = useApp();
  const location = useLocation();

  const borrowerNavigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Apply for Loan', href: '/app/apply', icon: CreditCard },
    { name: 'My Documents', href: '/app/documents', icon: FolderOpen },
    { name: 'Profile', href: '/app/profile', icon: User },
  ];

  const adminNavigation = [
    { name: 'Dashboard', href: '/app/admin/dashboard', icon: BarChart3 },
    { name: 'Companies', href: '/app/admin/companies', icon: Users },
    { name: 'Loan Applications', href: '/app/admin/loans', icon: FileText },
    { name: 'Reports', href: '/app/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/app/admin/settings', icon: Settings },
  ];

  const navigation = state.user?.role === 'admin' ? adminNavigation : borrowerNavigation;

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-neutral-200 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">Wellem Capital</h1>
                <p className="text-xs text-neutral-500">Business Loans</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-primary-50 text-primary-800 border-r-2 border-primary-800'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <Icon
                    className={clsx(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActiveRoute(item.href) ? 'text-primary-800' : 'text-neutral-400 group-hover:text-neutral-500'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-neutral-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-800" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-900">
                  {state.user?.email}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {state.user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 z-50 flex',
          isOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={clsx(
            'fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-linear',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClose}
        />
        
        <div
          className={clsx(
            'relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">Wellem Capital</h1>
                <p className="text-xs text-neutral-500">Business Loans</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={clsx(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-primary-50 text-primary-800'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <Icon
                    className={clsx(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActiveRoute(item.href) ? 'text-primary-800' : 'text-neutral-400 group-hover:text-neutral-500'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-neutral-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-800" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-900">
                  {state.user?.email}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {state.user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;