import { ICategoryRepository } from './category.IRepository';
import { CategoryModel } from './category.model';
import { ICategory } from './category.interface';


export class CategoryRepository implements ICategoryRepository {
  async create(category: ICategory) {
    return await CategoryModel.create(category);
  }

  async findAll(search="",page=1,limit=10) {
    const query={
        name:{
            $regex:search,$option:"i"
        }
    }
    const categories = await CategoryModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

    const total = await CategoryModel.countDocuments(query);

    return { categories, total };

  }

  async findById(id: string) {
    return await CategoryModel.findById(id).exec();
  }

  async update(id: string, data: Partial<ICategory>) {
    return await CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    await CategoryModel.findByIdAndDelete(id);
  }
}
