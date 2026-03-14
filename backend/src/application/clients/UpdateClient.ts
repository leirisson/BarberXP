import { Client } from '@domain/clients/Client';

type Repo = {
  findById: (id: string) => Promise<{ id: string; name: string; phone: string; address?: string; dateOfBirth?: Date } | null>;
  findByPhone: (phone: string) => Promise<{ id: string } | null>;
  update: (client: { id: string; name: string; phone: string; address?: string; dateOfBirth?: Date }) => Promise<void>;
};

export class UpdateClient {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }
  async execute(input: { id: string; name?: string; phone?: string; address?: string; dateOfBirth?: Date }): Promise<Client> {
    const current = await this.repo.findById(input.id);
    if (!current) throw new Error('Cliente não encontrado');
    const nextName = input.name ?? current.name;
    const nextPhone = input.phone ?? current.phone;
    if (input.phone && input.phone !== current.phone) {
      const dup = await this.repo.findByPhone(input.phone);
      if (dup && dup.id !== input.id) throw new Error('Telefone já cadastrado');
    }
    const nextAddress = input.address ?? current.address;
    const nextDob = input.dateOfBirth ?? current.dateOfBirth;
    const updated = Client.create({
      name: nextName,
      phone: nextPhone,
      address: nextAddress,
      dateOfBirth: nextDob,
    });
    await this.repo.update({
      id: input.id,
      name: updated.name,
      phone: updated.phone.value,
      address: updated.address,
      dateOfBirth: updated.dateOfBirth,
    });
    return updated;
  }
}
