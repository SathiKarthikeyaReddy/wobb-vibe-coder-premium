import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { Users, Search, Moon, Sun } from "lucide-react";
import { ShortlistSidebar } from "./ShortlistSidebar";
import { useListStore } from "@/store/useListStore";
import { useDarkMode } from "usehooks-ts";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const selectedCount = useListStore((state) => state.selectedProfiles.length);
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Toaster position="top-center" richColors theme={isDarkMode ? "dark" : "light"} />
      
      <header className="sticky top-0 z-30 glass border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
              VibeSearch
            </span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggle}
              className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              className="relative p-2.5 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-95"
            >
              <Users className="w-5 h-5" />
              <span className="font-semibold hidden sm:inline tracking-tight">Shortlist</span>
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static sm:top-auto sm:right-auto bg-indigo-600 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                  {selectedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
          </div>
        )}
        {children}
      </main>

      <ShortlistSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
