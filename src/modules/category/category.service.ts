import { ICategory } from "./category.interface";
import { ICategoryRepository } from "./category.IRepository";

export class CategoryService{
    constructor(private categoryRepo:ICategoryRepository){}
    createCategory(data:ICategory){
        const category=this.categoryRepo.create(data);
        return category;
    }
    findAll(){}
    findById(){}
    update(){}
    delete(){}
}