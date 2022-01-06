import Joi = require("joi");

export interface UploadPedomanRequestData {
  kode_matakuliah: string;
  pedoman: any;
}

export class UploadPedomanRequest {
  data: UploadPedomanRequestData;

  constructor(data: UploadPedomanRequestData) {
    this.data = data;
  }

  public validate() {
    const schema = Joi.object({
      kode_matakuliah: Joi.string().required(),
      pedoman: Joi.allow()
    });

    return schema.validate(this.data);
  }
}
