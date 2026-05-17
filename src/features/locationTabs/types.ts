import type { Coordinates } from '@shared/types/coordinates';

export type LocationTab = {
  id: number;
  label: string;
  coordinates: Coordinates | null;
};
