import { create } from 'zustand';

interface SiteStore {
  site: any;
  siteLink: string;
  setSite: (site: any) => void;
  setSiteLink: (bidId: string) => void;
}

const useSiteStore = create<SiteStore>((set) => ({
  site: null,
  siteLink: '',
  setSite: (site) => set({ site }),
  setSiteLink: (siteLink) => set({ siteLink }),
}));

export default useSiteStore;
