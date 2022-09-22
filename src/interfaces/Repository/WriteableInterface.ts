export interface WriteableInterface<Entity, DTO = Entity> {
  create(payload: DTO): Promise<Entity>;
}
