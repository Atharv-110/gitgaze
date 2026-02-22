"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ReadmeConfig = {
  onCopyMarkdown?: () => boolean;
  onDownloadMarkdown?: () => void;
};

export type PageHeaderConfig = {
  readme?: ReadmeConfig;
  // other pages can add their configurations here
};

interface PageHeaderContextType {
  config: PageHeaderConfig;
  setConfig: React.Dispatch<React.SetStateAction<PageHeaderConfig>>;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(
  undefined,
);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PageHeaderConfig>({});

  return (
    <PageHeaderContext.Provider value={{ config, setConfig }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeaderContext() {
  const context = useContext(PageHeaderContext);
  if (context === undefined) {
    throw new Error(
      "usePageHeaderContext must be used within a PageHeaderProvider",
    );
  }
  return context;
}
