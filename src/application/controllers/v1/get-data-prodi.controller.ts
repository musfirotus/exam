import { Controller, Example, Get, Path, Route } from "tsoa";
import { writeErrorLogToFile } from "../../../utils/error-log.helper";
import { ResponseHelper } from "../../../utils/response.helper";
import { ProgramStudiModel } from "../../models/data-access/program-studi.model";

@Route('/v1/fakultas')
export class GetDataProdiController extends Controller {
  /*
  Mengirim response berupa data detail fakultas dan relasinya.
  */
  @Example<any>({
    'data': {
      kode_program_studi: 'string',
      kode_fakultas: 'string',
      kode_jenjang: 'string',
      nama_ps_20082: 'string',
      kode_program_studi_dikti: 'string',
      masa_kurikulum: 'string',
      nomor_kurikulum: 'string',
      nama_singkat_ps: 'string',
      nama_program_studi: 'string',
      nama_program_pendidikan: 'string',
      status_ps: 'string',
      komponen_skor: 'string',
      status_online: 'string',
      created_by: 'string',
      updated_by: 'string',
  },
    'success': true
  })
  @Get('{kode_program_studi}')
  public async getDataProdi(kode_program_studi: string): Promise<any> {
    try {
      const prodi =  await ProgramStudiModel.findOne({
        kode_program_studi: kode_program_studi
      }).select(['-_id', '-__v'])
      
      if(!kode_program_studi) {
        this.setStatus(400)
        return new ResponseHelper<any>(`Data dengan kode program studi ${kode_program_studi} tidak ditemukan`, false)
      }
      
      this.setStatus(200)
      return new ResponseHelper<any>(prodi, true)
    } catch (error) {
      this.setStatus(error.status)
      writeErrorLogToFile(error.message)
      return new ResponseHelper<any>(error.message, false)
    }
  }
}
