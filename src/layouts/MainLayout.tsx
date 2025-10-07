import { useState } from "react";
import MainTopBar from "@/components/MainTopBar";

const MainLayout: React.FC<MainLayoutType> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <MainTopBar />

      <main className="flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
