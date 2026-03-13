import { Client } from '@domain/clients/Client';

type Repo = {
  list: () => Promise<Array<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }>>;
};

export class ListClients {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(): Promise<Client[]> {
    throw new Error('Not implemented');
  }
}

