import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const userRouter = Router();

userRouter.patch('/users/me/avatar', authenticate, upload.single('avatar'));

export default userRouter;
