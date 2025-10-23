import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMobileMenu = false }) => {
  const { state, logout } = useApp();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthenticated = state.user;

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            {showMobileMenu && (
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={onMenuClick}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900">Wellem Capital</h1>
                <p className="text-xs text-neutral-500">Business Loans</p>
              </div>
            </Link>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    type="button"
                    className="p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    {state.notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                        {state.notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-neutral-900 mb-2">
                          Notifications
                        </h3>
                        {state.notifications.length === 0 ? (
                          <p className="text-sm text-neutral-500">No notifications</p>
                        ) : (
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {state.notifications.slice(0, 5).map((notification) => (
                              <div
                                key={notification.id}
                                className="p-2 bg-neutral-50 rounded-lg"
                              >
                                <p className="text-sm font-medium text-neutral-900">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {notification.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium text-neutral-700">
                      {state.user?.email}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        {state.user?.role === 'borrower' && (
                          <>
                            <Link
                              to="/app/dashboard"
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/app/profile"
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Profile
                            </Link>
                          </>
                        )}
                        {state.user?.role === 'admin' && (
                          <>
                            <Link
                              to="/app/admin/dashboard"
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                            <Link
                              to="/app/admin/companies"
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Manage Companies
                            </Link>
                          </>
                        )}
                        <hr className="my-1 border-neutral-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;