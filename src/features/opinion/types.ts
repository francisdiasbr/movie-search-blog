export interface OpinionEntry {
  opinion: string;
  rate: string;
}

export interface OpinionState {
  data: OpinionEntry | null;
  loading: boolean;
  error: string | null;
}
