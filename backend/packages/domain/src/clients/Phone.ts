export class Phone {
  readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }
  static create(raw: string) {
    const digits = raw.replace(/\D/g, '');
    if (!/^\d+$/.test(digits)) throw new Error('Telefone inválido');
    if (digits.length < 10) throw new Error('Telefone inválido');
    return new Phone(digits);
  }
}

