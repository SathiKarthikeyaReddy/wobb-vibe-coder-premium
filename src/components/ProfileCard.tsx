import { useNavigate } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListStore } from "@/store/useListStore";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isShortlisted } = useListStore();
  const shortlisted = isShortlisted(profile.username);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const toggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shortlisted) {
      removeProfile(profile.username);
      toast("Removed from shortlist", {
        description: `@${profile.username} has been removed.`,
      });
    } else {
      addProfile(profile);
      toast.success("Added to shortlist", {
        description: `@${profile.username} was added to your list.`,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-3 cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 w-full max-w-2xl"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300" />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-1.5 truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{profile.fullname}</div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2 bg-slate-100 dark:bg-slate-800 w-fit px-2.5 py-1 rounded-md transition-colors">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
      <button
        onClick={toggleShortlist}
        className={`mt-2 sm:mt-0 px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
          shortlisted 
            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20" 
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm hover:shadow"
        }`}
      >
        {shortlisted ? (
          <>
            <Check className="w-4 h-4" /> Added
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" /> Add to List
          </>
        )}
      </button>
    </div>
  );
}
