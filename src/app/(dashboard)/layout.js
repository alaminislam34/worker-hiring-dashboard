// app/dashboard/layout.js
import { Toaster } from "react-hot-toast";
import "../globals.css";
// import QueryProvider from "../providers/QueryProvider";
// import { StateProvider } from "../providers/StateProvider";
import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardLayout2 from "./components/Layouts/DashboardLayout";
import { StateProvider } from "../providers/StateProviders";

export default function DashboardLayout({ children }) {
  return (
    <main className="flex min-h-screen">
      <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} />
      <StateProvider>
        {/* <QueryProvider> */}
        {/* <StateProvider> */}
        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block lg:w-67 xl:w-77 shrink-0 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
          {/* Sticky Header with Padding */}
          <header className="sticky top-0 border-b border-b-gray-100 bg-white z-50 p-4 pb-2">
            <DashboardNavbar />
          </header>

          {/* Scrollable Body Content Area */}
          <div className="flex-1 overflow-y-auto space-y-6 scroll-smooth bg-gray-50">
            <DashboardLayout2 children={children} />
          </div>
        </section>
      </StateProvider>
      {/* </StateProvider> */}
      {/* </QueryProvider> */}
    </main>
  );
}
