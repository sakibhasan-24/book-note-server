import { Request, Response } from "express";
import { NoteService } from "./note.service";
import { CategoryModel } from "../category/category.model";
import { CategoryService } from "../category/category.service";

const noteService = new NoteService();

export class NoteController {
  static async createNote(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const { title, content, category, isPinned, type } = req.body;
     let categoryId = category;
     console.log(categoryId)
     const categoryName=await CategoryModel.findById({_id:categoryId});
    //  console.log(categoryName?.name)
      const note = await noteService.createNote({
        user: userId,
        title,
        content,
        category: categoryId,
        isPinned: isPinned ?? false,
        type: type ?? 'note',
        categoryName:categoryName?.name,
      });

      return res.status(201).json({
        status: true,
        message: 'Note created successfully',
        note,
      });
  }

  static async getNotes(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const { search = "", page = 1, limit = 10 } = req.query;
    const notes = await noteService.getNotes(
      userId,
      search.toString(),
      Number(page),
      Number(limit)
    );
    res.status(200).json({ status: true, message: "Fetched notes", ...notes });
  }

  static async getNoteById(req: Request, res: Response) {
    const note = await noteService.getNoteById(req.params.id);
    res.status(200).json({ status: true, message: "Fetched single note", note });
  }

  static async updateNote(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const updated = await noteService.updateNote(req.params.id, userId, req.body);
    res.status(200).json({ status: true, message: "Note updated", note: updated });
  }

  static async deleteNote(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    await noteService.deleteNote(req.params.id, userId);
    res.status(204).send();
  }
}
