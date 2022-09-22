import { WriteableInterface } from './WriteableInterface';
import { ReadableInterface } from './ReadableInterface';

export interface RepositoryInterface<Entity, DTO = Entity>
  extends WriteableInterface<Entity, DTO>,
    ReadableInterface<Entity> {}
