export type Config = {
  name: string;
  project: string;
  environment: string;
  created_at: Date;
  initial_fetch_at: Date;
  last_fetch_at: Date;
  root: boolean;
  locked: boolean;
};
