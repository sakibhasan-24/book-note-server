import { ICategoryRepository } from './category.IRepository';
import { ICategory } from './category.interface';
import { CategoryModel } from './category.model';

export class CategoryRepository implements ICategoryRepository {
  async create(data: Partial<ICategory>) {
    const category = new CategoryModel(data);
    return category.save();
  }

  async findById(id: string) {
    return CategoryModel.findById(id);
  }
    async findByName(name:String){
      return CategoryModel.findOne({name});
     }
  async findAll(userId: string, search = '', page = 1, limit = 10) {
    const query = {
      user: userId,
      name: { $regex: search, $options: 'i' }
    };
    

    const categories = await CategoryModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await CategoryModel.countDocuments(query);
    return { categories, total };
  }

  async update(id: string, data: Partial<ICategory>) {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    await CategoryModel.findByIdAndDelete(id);
  }
}
