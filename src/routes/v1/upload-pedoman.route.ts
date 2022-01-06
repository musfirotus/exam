import { Router } from "express";
import { UploadPedomanController } from "../../application/controllers/v1/upload-pedoman.controller";
import { MulterHelper } from '../../utils/multer.helper';

export const uploadPedomanRoute = Router().post('/v1/fakultas/upload-pedoman', MulterHelper.upload('pedoman').single('pedoman'), UploadPedomanController.uploadPedoman);
