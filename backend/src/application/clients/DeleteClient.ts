type Repo = {
  findById: (id: string) => Promise<{ id: string } | null>;
  delete: (id: string) => Promise<void>;
};

export class DeleteClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { id: string }): Promise<void> {
    throw new Error('Not implemented');
  }
}

