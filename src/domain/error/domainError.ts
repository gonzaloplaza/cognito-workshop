export class DomainError extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
