import { Phone } from './Phone';

export type ClientProps = {
  id?: string;
  name: string;
  phone: Phone;
};

export class Client {
  readonly id?: string;
  readonly name: string;
  readonly phone: Phone;
  private constructor(props: ClientProps) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
  }
  static create(input: { name: string; phone: string }) {
    const name = input.name?.trim();
    if (!name) throw new Error('Nome obrigatório');
    const phone = Phone.create(input.phone);
    return new Client({ name, phone });
  }
}

