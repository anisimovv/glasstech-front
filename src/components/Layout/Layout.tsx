import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-48 bg-slate-900"></div>
      {children}
    </div>
  );
};
