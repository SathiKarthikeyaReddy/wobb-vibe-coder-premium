import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = () => {
    // Left for potential analytics tracking in a real app
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-center mb-10 mt-4 transition-colors">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
          Discover Top Creators
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl transition-colors">
          Browse our curated list of elite influencers across all major social platforms to find the perfect match for your brand.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="text-center mb-6">
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-1.5 rounded-full inline-block shadow-sm transition-colors">
          Showing <span className="text-slate-900 dark:text-white font-bold">{filtered.length}</span> creators on {platform}
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
