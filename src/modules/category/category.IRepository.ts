

/* 
create a category
findAll category(pagination)
find by id
update
delete
*/


import { ICategory } from './category.interface';

export interface ICategoryRepository {
  create(category: ICategory): Promise<ICategory>;
  findAll(
    search?:string,
    page?:number,
    limit?:number
  ): Promise<{categories:ICategory[];total:number}>;
  findById(id: string): Promise<ICategory | null>;
  update(id: string, data: Partial<ICategory>): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
}
