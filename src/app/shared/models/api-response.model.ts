export interface BFFResponse<T> {
  statusCode: number;
  data: T;
}
