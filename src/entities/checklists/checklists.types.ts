interface Criteria {
  name: string;
  minScore: number;
  maxScore: number;
  score: number | null;
  help: string | null;
  comment: string | null;
}

interface Block {
  name: string;
  minScore: number;
  maxScore: number;
  score: number | null;
  criterias: Criteria[];
}

interface Data {
  name: string | null;
  minScore: number;
  maxScore: number;
  score: number | null;
  blocks: Block[];
}

export interface Checklist {
  id: number;
  name: string | null;
  isActive: boolean;
  data: Data | null;
}
