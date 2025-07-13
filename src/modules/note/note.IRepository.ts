import { INotes } from "./note.interface";

export interface INoteRepository {
  create(data: Partial<INotes>): Promise<INotes>;
  findAll(userId: string, search: string, page: number, limit: number): Promise<{ data: INotes[]; total: number }>;
  findById(id: string): Promise<INotes | null>;
  update(id: string, data: Partial<INotes>): Promise<INotes | null>;
  delete(id: string): Promise<INotes | null>;
}
