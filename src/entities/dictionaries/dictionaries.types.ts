export interface Dictionary {
  id: number;
  name: string | null;
  isActive: boolean;
  type: DictionaryType;
  data: {
    phrases: string[];
  } | null;
}

export const DictionaryTypeValues = ['All', 'OnlyOperator', 'OnlyClient', 'Hotwords'] as const;
export type DictionaryType = typeof DictionaryTypeValues[number];
