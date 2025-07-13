import { AppError } from '../../error/AppError';
import { ICategoryRepository } from './category.IRepository';
import { ICategory } from './category.interface';

export class CategoryService {
  constructor(private categoryRepo: ICategoryRepository) {}

  async createCategory(data: Partial<ICategory>) {
    const {name}=data;
    const alreadyExist=await this.categoryRepo.findByName(name?.toUpperCase() as string);
    if(alreadyExist && alreadyExist?.name.toLowerCase()){
       throw new AppError("category Already Exists",400);
    }
    return this.categoryRepo.create(data);
  }

  async getCategoryById(id: string) {
    return this.categoryRepo.findById(id);
  }

  async getCategories(userId: string, search: string, page: number, limit: number) {
    return this.categoryRepo.findAll(userId, search, page, limit);
  }

 async  updateCategory(id: string, userId: string, data: Partial<ICategory>) {
    const category= this.categoryRepo.findById(id);
    if(!category){
        throw new AppError("category Not Found",404);
    }  
      return this.categoryRepo.update(id, data);
    };
  
  async deleteCategory(id: string, userId: string) {
    const category= this.categoryRepo.findById(id);
    if(!category){
        throw new AppError("category Not Found",404);
    }  
      return this.categoryRepo.delete(id);
  }
}
