export interface Authorizer<R, S, N> {
  authorize(req: R, res: S, next: N): void;
}
