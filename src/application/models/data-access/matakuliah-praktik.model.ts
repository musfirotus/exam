import { Document, model, Schema } from 'mongoose';

export interface MatakuliahPraktikDocument extends Document {
  sks: Number,
  masa: String,
  jumlah_periksa: Number,
  persen_na1: Number,
  persen_na2: Number,
  status_praktek_mandiri: Boolean,
  kode_jenis_formula: String,
  kode_program_studi: String,
  kode_mtk: String,
  nama_matakuliah: String,
  folder_pedoman: String,
  file_pedoman: String,
}

const MatakuliahPraktikSchema: Schema = new Schema({
  sks: Number,
  masa: String,
  jumlah_periksa: Number,
  persen_na1: Number,
  persen_na2: Number,
  status_praktek_mandiri: Boolean,
  kode_jenis_formula: String,
  kode_program_studi: String,
  kode_mtk: String,
  nama_matakuliah: String,
  folder_pedoman: String,
  file_pedoman: String,
}, {
  // timestamps: true,
  collection: 'matakuliah-praktik'
});

export const MatakuliahPraktikModel = model<MatakuliahPraktikDocument>('matakuliah-praktik', MatakuliahPraktikSchema);
