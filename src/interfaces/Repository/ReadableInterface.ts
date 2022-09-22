export interface ReadableInterface<Entity> {
  all(): Promise<Entity[]>;
  find(id: number | string): Promise<Entity>;
}
