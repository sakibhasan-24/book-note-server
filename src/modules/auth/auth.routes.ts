
import express from 'express';
import { validateRegister } from './auth.validator';
import { AuthController } from './auth.controller';
import { asyncHandler } from '../../middlewares/asyncHandler';


const router = express.Router();

// Request ─► Route ─► Validator ─► Controller ─► Service ─► Repository Interface ─► Mongoose Model ─► MongoDB

router.post('/register', validateRegister, asyncHandler(AuthController.register));

export const authRoutes=router;
