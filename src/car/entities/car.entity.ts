export class Car {
  id: string;

  constructor(payload: { id: string }) {
    this.id = payload.id;
  }
}
