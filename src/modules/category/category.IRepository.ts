

/* 
create a category
findAll category(pagination)
find by id
update
delete
*/


import { ICategory } from './category.interface';

export interface ICategoryRepository {
  create(data: Partial<ICategory>): Promise<ICategory>;
  findById(id: string): Promise<ICategory | null>;
  findByName(name:String):Promise<ICategory|null>;
  findAll(userId: string, search?: string, page?: number, limit?: number): 
  Promise<{ categories: ICategory[], total: number }>;
  update(id: string, data: Partial<ICategory>): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
}
