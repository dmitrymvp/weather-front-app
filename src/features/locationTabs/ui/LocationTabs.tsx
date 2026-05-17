import type { LocationTab } from '../types';
import './LocationTabs.css';

type Props = {
  tabs: LocationTab[];
  activeTabId: number;
  onTabChange: (id: number) => void;
};

const LocationTabs = ({ tabs, activeTabId, onTabChange }: Props) => (
  <nav className="location-tabs">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`location-tabs__tab${activeTabId === tab.id ? ' location-tabs__tab--active' : ''}`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default LocationTabs;
