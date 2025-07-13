import { INotes } from "./note.interface";
import { INoteRepository } from "./note.IRepository";

import { AppError } from "../../error/AppError";
import { NoteRepository } from "./note.Repository";

export class NoteService {
  constructor(private repo: INoteRepository = new NoteRepository()) {}

  async createNote(data: Partial<INotes>) {
    return await this.repo.create(data);
  }

  async getNotes(userId: string, search: string, page: number, limit: number) {
    return await this.repo.findAll(userId, search, page, limit);
  }

  async getNoteById(id: string) {
    const note = await this.repo.findById(id);
    if (!note) throw new AppError("Note not found", 404);
    return note;
  }

  async updateNote(id: string, userId: string, data: Partial<INotes>) {
    const note = await this.repo.findById(id);
    if (!note || note.user.toString() !== userId)
      throw new AppError("Unauthorized or not found", 403);

    return await this.repo.update(id, data);
  }

  async deleteNote(id: string, userId: string) {
    const note = await this.repo.findById(id);
    if (!note || note.user.toString() !== userId)
      throw new AppError("Unauthorized or not found", 403);

    return await this.repo.delete(id);
  }
}
