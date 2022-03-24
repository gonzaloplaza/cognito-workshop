import { UuidGenerator } from '@domain/service/uuidGenerator';
import { v4 as uuidv4 } from 'uuid';

export class Uuidv4Generator implements UuidGenerator {
  private readonly uuidv4: typeof uuidv4;

  constructor() {
    this.uuidv4 = uuidv4;
  }

  public generate(): string {
    return this.uuidv4();
  }
}
