import { Request, Response } from 'express';
import { unlink } from 'fs';
import { join } from 'path';
import { Post, Route } from 'tsoa';
import { returnsErrorMessage } from '../../../utils/error-log.helper';
import { ResponseHelper } from '../../../utils/response.helper';
import { MatakuliahPraktikDocument, MatakuliahPraktikModel } from '../../models/data-access/matakuliah-praktik.model';
import { UploadPedomanRequest } from '../../models/request-interface/upload-pedoman.request';

export class UploadPedomanController {

  public static async uploadPedoman(req: Request, res: Response): Promise<any> {
    try {
      const { error } = new UploadPedomanRequest(req.body).validate();
      if (error) return returnsErrorMessage(res, String(error), 400);
      const matakuliahPraktik = await MatakuliahPraktikModel.findOne({
        kode_mtk: req.body.kode_matakuliah,
        masa: '20202'
      });

      if (req.file.mimetype !== 'application/pdf') { 
        unlink(join(process.cwd(), req.file.path), err => console.log(err));
        throw returnsErrorMessage(res, 'Jenis file yang didukung hanya pdf', 400);
      }
      else if (req.file.size >= 5 * (1024 * 1024)) {
        unlink(join(process.cwd(), req.file.path), err => console.log(err));
        throw returnsErrorMessage(res, 'maksimal ukuran file hanya 5mb', 400);
      }

      else if (!matakuliahPraktik) {
        unlink(join(process.cwd(), req.file.path), err => console.log(err));
        return returnsErrorMessage(res, String('Mata kuliah tidak ditemukan'), 400);
      }
      else {
        const updateMatkul = await matakuliahPraktik.updateOne({
          folder_pedoman: req.file.path,
          file_pedoman: req.file.originalname
        });
        const updated = await MatakuliahPraktikModel.findById(matakuliahPraktik._id);
        
        return res.status(200).json(new ResponseHelper<any>(updated, true));
      }

    } catch (error) {
      return returnsErrorMessage(res, error.message, 500);
    }
  }

}
