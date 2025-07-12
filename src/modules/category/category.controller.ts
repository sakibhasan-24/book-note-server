import { Request, Response } from "express";
import { CategoryRepository } from "./category.Repository";
import { CategoryService } from "./category.service";

const categoryRepository=new CategoryRepository();
const categoryService=new CategoryService(categoryRepository);

export class CategoryController{
    static async createCategory(req:Request,res:Response){
        console.log((req as any).user)
        const userId =(req as any).user!.userId;
        const category = await categoryService.createCategory({ ...req.body, user: userId });
        res.status(201).json({ status: true, category,message:"Category Created Successfully" });
    }

    static async getCategories(req:Request,res:Response){
        const {search="",page=1,limit=10}=req.query;
        const result=await 
        categoryService.getCategories((req as any).user!.userId ,search.toString(),Number(page),Number(limit))
        res.status(200).json({message:"Get All categories",status:true,category:result})
    }
    static async updateCategories(req:Request,res:Response){
            const updated = await 
            categoryService.updateCategory(req.params.id,(req as any).user!.userId, req.body);
            res.status(200).json({message:"Update Successfully",status:true,category:updated})

    }

    static async deleteCategory(req:Request,res:Response){
            await categoryService.deleteCategory(req.params.id, (req as any).user!.userId);
            res.status(204).json({status:true,message:"delete successfully"})

    }
}