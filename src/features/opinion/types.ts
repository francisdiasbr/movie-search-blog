export interface OpinionEntry {
  enjoying_1: string;
  enjoying_2: string;
  opinion: string;
}

export interface OpinionState {
  data: OpinionEntry | null;
  loading: boolean;
  error: string | null;
}
