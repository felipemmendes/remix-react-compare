export class CustomError extends Error {
  constructor({ error, status }) {
    super(error)
    this.status = status
  }
}
