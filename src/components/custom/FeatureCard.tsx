import React from 'react';
import clsx from 'clsx';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  link?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  className,
  link,
}: FeatureCardProps): JSX.Element {
  const Card = ({ children }) => {
    if (link) {
      return (
        <a
          href={link}
          className={clsx(
            'tw-block tw-p-6 tw-rounded-lg tw-shadow-md hover:tw-shadow-lg tw-transition-shadow tw-duration-200',
            'tw-bg-white dark:tw-bg-gray-800',
            className,
          )}>
          {children}
        </a>
      );
    }
    return (
      <div
        className={clsx(
          'tw-p-6 tw-rounded-lg tw-shadow-md',
          'tw-bg-white dark:tw-bg-gray-800',
          className,
        )}>
        {children}
      </div>
    );
  };

  return (
    <Card>
      {icon && <div className="tw-text-3xl tw-mb-4">{icon}</div>}
      <h3 className="tw-text-xl tw-font-bold tw-mb-2 tw-text-gray-900 dark:tw-text-white">
        {title}
      </h3>
      <p className="tw-text-gray-600 dark:tw-text-gray-300">{description}</p>
    </Card>
  );
}
