import express from 'express';
import { authenticate } from '../../middlewares/verifyToken';
import { validateCategoryUpodate, validateCreateCategory } from './category.validator';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { CategoryController } from './category.controller';


const router = express.Router();

router.post('/', authenticate, validateCreateCategory,asyncHandler(CategoryController.createCategory));
router.get('/', authenticate, asyncHandler(CategoryController.getCategories));
router.get("/:id",authenticate,asyncHandler(CategoryController.getCategoryById))
router.put('/:id', authenticate, validateCategoryUpodate,asyncHandler(CategoryController.updateCategories));
router.delete('/:id', authenticate, asyncHandler(CategoryController.deleteCategory));

export const categoryRouter=router;
