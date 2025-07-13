import { INotes } from "./note.interface";
import { INoteRepository } from "./note.IRepository";
import { Note } from "./note.model";

export class NoteRepository implements INoteRepository {
  async create(data: Partial<INotes>) {
    return await Note.create(data);
  }

  async findAll(userId: string, search: string, page: number, limit: number) {
    const query = {
      user: userId,
      title: { $regex: search, $options: "i" },
    };

    const total = await Note.countDocuments(query);
    const data = await Note.find(query)
      .populate("category", "name")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return { data, total };
  }

  async findById(id: string) {
    return await Note.findById(id).populate("category", "name");
  }

  async update(id: string, data: Partial<INotes>) {
    return await Note.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Note.findByIdAndDelete(id);
  }
}
