import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Company, LoanApplication, Notification } from '../types';

interface AppState {
  user: User | null;
  company: Company | null;
  currentLoanApplication: LoanApplication | null;
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

type AppAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_COMPANY'; payload: Company | null }
  | { type: 'SET_CURRENT_LOAN'; payload: LoanApplication | null }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: AppState = {
  user: null,
  company: null,
  currentLoanApplication: null,
  notifications: [],
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_COMPANY':
      return { ...state, company: action.payload };
    case 'SET_CURRENT_LOAN':
      return { ...state, currentLoanApplication: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [action.payload, ...state.notifications] 
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;
  setCurrentLoan: (loan: LoanApplication | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    
    if (savedCompany) {
      try {
        const company = JSON.parse(savedCompany);
        dispatch({ type: 'SET_COMPANY', payload: company });
      } catch (error) {
        console.error('Error parsing saved company:', error);
        localStorage.removeItem('company');
      }
    }
  }, []);

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setCompany = (company: Company | null) => {
    dispatch({ type: 'SET_COMPANY', payload: company });
    if (company) {
      localStorage.setItem('company', JSON.stringify(company));
    } else {
      localStorage.removeItem('company');
    }
  };

  const setCurrentLoan = (loan: LoanApplication | null) => {
    dispatch({ type: 'SET_CURRENT_LOAN', payload: loan });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Mock login function - replace with actual API call
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (email === 'admin@wellemcapital.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@wellemcapital.com',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(adminUser);
      } else if (email && password) {
        const borrowerUser: User = {
          id: 'borrower-1',
          email: email,
          role: 'borrower',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(borrowerUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    setCurrentLoan(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('currentLoan');
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setUser,
    setCompany,
    setCurrentLoan,
    addNotification,
    markNotificationRead,
    clearError,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};