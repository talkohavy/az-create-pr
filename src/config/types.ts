export interface Context {
  defaultTargetBranch: string;
  reviewers: Array<string>;
  autoComplete: {
    default: boolean;
    skip: boolean;
  };
}

export interface Config {
  currentContext: string | null;
  contexts: Record<string, Context>;
}
