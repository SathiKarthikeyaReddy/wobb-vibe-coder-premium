import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ListState {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (username: string) => void;
  isShortlisted: (username: string) => boolean;
  clearList: () => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      addProfile: (profile) =>
        set((state) => {
          if (state.selectedProfiles.some((p) => p.username === profile.username)) {
            return state;
          }
          return { selectedProfiles: [...state.selectedProfiles, profile] };
        }),
      removeProfile: (username) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.username !== username
          ),
        })),
      isShortlisted: (username) =>
        get().selectedProfiles.some((p) => p.username === username),
      clearList: () => set({ selectedProfiles: [] }),
    }),
    {
      name: "wobb-profile-shortlist",
    }
  )
);
