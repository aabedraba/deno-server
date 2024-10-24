import React from 'react';
import { BaseProvider } from '../providers/base';
import type { BaseProps } from '../types';

interface ShellConfig {
  theme?: 'light' | 'dark';
  locale?: string;
}

interface ShellProps extends BaseProps {
  config?: ShellConfig;
}

export const Shell: React.FC<ShellProps> = ({ 
  children,
  config = { theme: 'light', locale: 'en' },
  className
}) => {
  return (
    <BaseProvider>
      <div className={className} data-theme={config.theme}>
        {children}
      </div>
    </BaseProvider>
  );
};
