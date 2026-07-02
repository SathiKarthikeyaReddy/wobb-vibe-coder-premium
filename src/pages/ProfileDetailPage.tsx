import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, UserProfileSummary } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { ArrowLeft, Check, Plus, ExternalLink, Activity, Users, Heart, MessageCircle, Eye, Hash } from "lucide-react";
import { useListStore } from "@/store/useListStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { ElementType } from "react";

const StatCard = ({ icon: Icon, label, value }: { icon: ElementType, label: string, value: string | number }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
    <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">{label}</div>
      <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 transition-colors">{value}</div>
    </div>
  </div>
);

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  
  const { addProfile, removeProfile, isShortlisted } = useListStore();

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Invalid profile</p>
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Back to search</Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto animate-pulse">
          <div className="flex gap-6 items-start">
            <div className="w-28 h-28 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
            <div className="space-y-4 flex-1">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
              <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-red-500 dark:text-red-400 mb-4 font-medium">Could not load profile details for {username}</p>
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Back to search</Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const shortlisted = isShortlisted(user.username);

  const toggleShortlist = () => {
    if (shortlisted) {
      removeProfile(user.username);
      toast("Removed from shortlist");
    } else {
      addProfile(user as unknown as UserProfileSummary); // Can cast to UserProfileSummary as it's a superset
      toast.success("Added to shortlist");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto transition-colors duration-300">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm mb-8 transition-colors"
        >
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <img
              src={user.picture}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg shrink-0"
              alt={user.fullname}
            />
            
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap transition-colors">
                    @{user.username}
                    <VerifiedBadge verified={user.is_verified} />
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mt-1 transition-colors">{user.fullname}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wide transition-colors">
                    {platform}
                  </div>
                </div>
                
                <button
                  onClick={toggleShortlist}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 w-full sm:w-auto ${
                    shortlisted 
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20" 
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm hover:shadow"
                  }`}
                >
                  {shortlisted ? <><Check className="w-4 h-4" /> Added to List</> : <><Plus className="w-4 h-4" /> Add to List</>}
                </button>
              </div>

              {user.description && (
                <p className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl text-[15px] transition-colors">
                  {user.description}
                </p>
              )}

              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> View Profile on {platform}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 px-1 transition-colors">Performance Metrics</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <StatCard icon={Users} label="Followers" value={formatFollowers(user.followers)} />
          <StatCard icon={Activity} label="Engagement Rate" value={formatEngagementRate(user.engagement_rate)} />
          {user.posts_count !== undefined && <StatCard icon={Hash} label="Total Posts" value={formatFollowers(user.posts_count)} />}
          {user.avg_likes !== undefined && <StatCard icon={Heart} label="Avg Likes" value={formatFollowers(user.avg_likes)} />}
          {user.avg_comments !== undefined && <StatCard icon={MessageCircle} label="Avg Comments" value={formatFollowers(user.avg_comments)} />}
          {user.avg_views !== undefined && user.avg_views > 0 && <StatCard icon={Eye} label="Avg Views" value={formatFollowers(user.avg_views)} />}
        </motion.div>
      </div>
    </Layout>
  );
}
