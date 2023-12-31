import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function DangerButton({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150',
        // eslint-disable-next-line react/prop-types
        props.className,
      )}
    >
      {children}
    </button>
  );
}
