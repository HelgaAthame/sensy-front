import { dictionaryColors } from '@/shared/constants/dictionaryColors';

export interface Dictionary {
  id: number;
  name: string | null;
  isActive: boolean;
  type: DictionaryType;
  colorHex: (typeof dictionaryColors)[number];
  data: {
    phrases: string[];
  } | null;
}

export const DictionaryTypeValues = [
  'All',
  'OnlyOperator',
  'OnlyClient',
  'Hotwords',
] as const;
export type DictionaryType = (typeof DictionaryTypeValues)[number];
