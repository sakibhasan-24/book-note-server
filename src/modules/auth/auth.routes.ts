
import express from 'express';
import { validateRegister } from './auth.validator';
import { AuthController } from './auth.controller';


const router = express.Router();

// Request ─► Route ─► Validator ─► Controller ─► Service ─► Repository Interface ─► Mongoose Model ─► MongoDB

router.post('/register', validateRegister, AuthController.register);

export default router;
