import { useState } from "react";
import Header from "@/components/Header";
import MainSidebar from "../components/";
import { LogoSvg } from "@/global/icons";

const MainLayout: React.FC<MainLayoutType> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <MainSidebar
        logo={LogoSvg}
        isMobile={true}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col lg:ml-[255px] ml-0">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
