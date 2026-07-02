import { Search } from "lucide-react";
import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { useDebounceValue } from "usehooks-ts";
import { useEffect, useState } from "react";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [debouncedSearch] = useDebounceValue(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-wrap gap-2 justify-center bg-slate-100/70 dark:bg-slate-800/40 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200/50 dark:border-slate-700/50">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                isSelected 
                  ? "text-slate-900 dark:text-white" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200/50 dark:border-slate-600/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{getPlatformLabel(p)}</span>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search creators by username or name..."
          className="w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-slate-900 dark:text-white"
        />
      </div>
    </div>
  );
}
