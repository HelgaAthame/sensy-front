export interface Dictionary {
  id: number;
  name: string | null;
  isActive: boolean;
  type: 'All' | 'OnlyOperator' | 'OnlyClient';
  data: {
    phrases: string[];
  } | null;
}
