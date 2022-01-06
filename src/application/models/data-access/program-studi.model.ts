import { Document, model, Schema } from "mongoose";

export interface ProgramStudiDocument extends Document {
    kode_program_studi: string,
    kode_fakultas: string,
    kode_jenjang: string,
    nama_ps_20082: string,
    kode_program_studi_dikti: string,
    masa_kurikulum: string,
    nomor_kurikulum: string,
    nama_singkat_ps: string,
    nama_program_studi: string,
    nama_program_pendidikan: string,
    status_ps: string,
    komponen_skor: string,
    status_online: string,
    created_by: string,
    updated_by: string,
}

const ProgramStudiSchema: Schema = new Schema({
    kode_program_studi: String,
    kode_fakultas: String,
    kode_jenjang: String,
    nama_ps_20082: String,
    kode_program_studi_dikti: String,
    masa_kurikulum: String,
    nomor_kurikulum: String,
    nama_singkat_ps: String,
    nama_program_studi: String,
    nama_program_pendidikan: String,
    status_ps: String,
    komponen_skor: String,
    status_online: String,
    created_by: String,
    updated_by: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'program_studi'
})

export const ProgramStudiModel = model<ProgramStudiDocument>('program-studi', ProgramStudiSchema)