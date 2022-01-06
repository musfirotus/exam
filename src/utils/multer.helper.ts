import * as multer from 'multer';

export class MulterHelper {
  
  static multerConfig() {
    const storage = multer.diskStorage({
      destination: './public/file-upload',
      filename: (req, file, cb) => cb(null, file.originalname)
    });

    return storage;
  }

  public static upload(path?: string, fileFilter?: any, sizeLimit?: number) {
    const multerUpload = multer({
      storage: multer.diskStorage({
        destination: `./public/file-upload/${path || ''}`,
        filename: (req, file, cb) => cb(null, file.originalname),
      }),
      fileFilter: fileFilter,
      limits: {
        fileSize: sizeLimit
      }
    });

    return multerUpload;
  }

}
