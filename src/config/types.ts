export type Reviewer = {
  name: string;
  email: string;
  checked?: boolean;
};

export interface Context {
  defaultTargetBranch: string;
  reviewers: Array<Reviewer>;
  autoComplete: {
    default: boolean;
    skip: boolean;
  };
}

export interface Config {
  currentContext: string | null;
  contexts: Record<string, Context>;
}
