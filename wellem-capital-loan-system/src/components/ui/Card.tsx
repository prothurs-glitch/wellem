import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'lg',
  shadow = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-card',
    lg: 'shadow-lg'
  };

  return (
    <div
      className={clsx(
        'card',
        paddingClasses[padding],
        shadowClasses[shadow],
        hover && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;