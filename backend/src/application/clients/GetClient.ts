import { Client } from '@domain/clients/Client';

type Repo = {
  findById: (id: string) => Promise<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date } | null>;
};

export class GetClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { id: string }): Promise<Client> {
    throw new Error('Not implemented');
  }
}

