import React from 'react';
import clsx from 'clsx';

interface CTAButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function CTAButton({
  children,
  href,
  variant = 'primary',
  size = 'medium',
  className,
}: CTAButtonProps): JSX.Element {
  const baseStyles = 'tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-font-semibold tw-transition-colors tw-duration-200';
  
  const variantStyles = {
    primary: 'tw-bg-primary-600 hover:tw-bg-primary-700 tw-text-white',
    secondary: 'tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-900 dark:tw-bg-gray-800 dark:hover:tw-bg-gray-700 dark:tw-text-white',
  };

  const sizeStyles = {
    small: 'tw-px-3 tw-py-1.5 tw-text-sm',
    medium: 'tw-px-4 tw-py-2 tw-text-base',
    large: 'tw-px-6 tw-py-3 tw-text-lg',
  };

  return (
    <a
      href={href}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}>
      {children}
    </a>
  );
}
