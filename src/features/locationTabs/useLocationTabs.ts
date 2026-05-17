import { useState } from 'react';
import { LOCATION_TABS } from './cities';

const LS_KEY = 'activeLocationTab';

export const useLocationTabs = () => {
  const [activeTabId, setActiveTabId] = useState<number>(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === null) return 0;
    const parsed = parseInt(saved, 10);
    return LOCATION_TABS.some((t) => t.id === parsed) ? parsed : 0;
  });

  const setTab = (id: number) => {
    setActiveTabId(id);
    localStorage.setItem(LS_KEY, String(id));
  };

  const activeTab = LOCATION_TABS.find((t) => t.id === activeTabId)!;

  return { activeTabId, activeTab, setTab, tabs: LOCATION_TABS };
};
