import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useListStore } from "@/store/useListStore";

interface ShortlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortlistSidebar({ isOpen, onClose }: ShortlistSidebarProps) {
  const { selectedProfiles, removeProfile, clearList } = useListStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/60 backdrop-blur-sm z-40 transition-colors"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-100 dark:border-slate-800 transition-colors"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between glass dark:bg-slate-900/70 sticky top-0 z-10 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shortlisted Profiles</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-colors">
                    <Trash2 className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p>Your shortlist is empty</p>
                </div>
              ) : (
                <AnimatePresence>
                  {selectedProfiles.map((profile) => (
                    <motion.div
                      key={profile.username}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <img src={profile.picture} alt={profile.fullname} className="w-12 h-12 rounded-full object-cover border border-slate-100 dark:border-slate-700" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">@{profile.username}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{profile.fullname}</p>
                      </div>
                      <button
                        onClick={() => removeProfile(profile.username)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Remove from shortlist"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {selectedProfiles.length > 0 && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 transition-colors">
                <button
                  onClick={clearList}
                  className="w-full py-3 px-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Clear Shortlist
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
