import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-container',
  full: 'max-w-full'
};

export default function Container({ children, className = '', size = 'xl' }: ContainerProps) {
  return (
    <div className={`mx-auto px-gutter ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}