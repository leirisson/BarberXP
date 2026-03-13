import { Phone } from './Phone';

export type ClientProps = {
  id?: string;
  name: string;
  phone: Phone;
  address?: string;
  dateOfBirth?: Date;
};

export class Client {
  readonly id?: string;
  readonly name: string;
  readonly phone: Phone;
  readonly address?: string;
  readonly dateOfBirth?: Date;
  private constructor(props: ClientProps) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.address = props.address;
    this.dateOfBirth = props.dateOfBirth;
  }
  static create(input: { name: string; phone: string; address?: string; dateOfBirth?: Date }) {
    const name = input.name?.trim();
    if (!name) throw new Error('Nome obrigatório');
    const phone = Phone.create(input.phone);
    const address = input.address?.trim() || undefined;
    const dob = input.dateOfBirth;
    if (dob && !(dob instanceof Date)) throw new Error('Data de nascimento inválida');
    if (dob && isNaN(dob.getTime())) throw new Error('Data de nascimento inválida');
    return new Client({ name, phone, address, dateOfBirth: dob });
  }
}
