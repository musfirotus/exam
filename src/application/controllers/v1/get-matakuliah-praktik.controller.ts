import { Controller, Example, Get, Route } from "tsoa";
import { writeErrorLogToFile } from "../../../utils/error-log.helper";
import { ResponseHelper } from "../../../utils/response.helper";
import { MatakuliahPraktikModel } from "../../models/data-access/matakuliah-praktik.model";

@Route('/v1/fakultas')
export class GetMataKuliahPraktikController extends Controller {
    @Example<any>({
        'data': [
            {
                'sks': 4,
                'masa': '20202',
                'jumlah_pemeriksa': 2,
                'jumlah_nilai': 2,
                'persen_na1': 50,
                'persen_na2': 50,
                'status_praktek_mandiri': '0',
                'kode_jenis_formulasi': 'NT',
                'kode_program_studi': '69',
                'kode_mtk': 'MKPR4869',
                'nama_matakuliah': 'Mata Kuliah PR',
                'folder_pedoman': 'public/file-upload/(Form_Permintaan_dan_Penghapusan_Email)2.pdf',
                'file_pedoman': '(Form_Permintaan_dan_Penghapusan_Email)2.pdf'
            },
            {
                'sks': 4,
                'masa': '20202',
                'jumlah_pemeriksa': 2,
                'jumlah_nilai': 2,
                'persen_na1': 50,
                'persen_na2': 50,
                'status_praktek_mandiri': '0',
                'kode_jenis_formulasi': 'NT',
                'kode_program_studi': '69',
                'kode_mtk': 'MKPR4869',
                'nama_matakuliah': 'Mata Kuliah PR',
                'folder_pedoman': 'public/file-upload/(Form_Permintaan_dan_Penghapusan_Email)2.pdf',
                'file_pedoman': '(Form_Permintaan_dan_Penghapusan_Email)2.pdf'
            }
        ],
        'success': true
    })
    @Get('/matakuliah-praktik/{kode_program_studi}')
    public async getMataKuliahPraktik(kode_program_studi: string): Promise<any> {
        try {
            const matakuliah = await MatakuliahPraktikModel.find({
                kode_program_studi: kode_program_studi
            }).select(['-_id', '-__v'])
            
            if(matakuliah.length == 0) {
                this.setStatus(400)
                return new ResponseHelper<any>(`Mata kuliah dengan kode prodi ${kode_program_studi} tidak dapat ditemukan`, false)
            }
            this.setStatus(200)
            return new ResponseHelper<any>(matakuliah, true)
        } catch (error) {
            this.setStatus(error.status)
            writeErrorLogToFile(error.message)
            return new ResponseHelper<any>({ message: error.message }, false);
        }
    }
}