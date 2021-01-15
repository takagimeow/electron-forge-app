import * as React from 'react';

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100"></div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
