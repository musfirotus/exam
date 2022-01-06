import { Response } from 'express';
import { appendFile, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export const writeErrorLogToFile = (errorMessage: string) => {
  const data = `${new Date().toISOString()} ${errorMessage} \r\n`
  appendFile(join(__dirname, '../../storage/logs/error.log'), data, (err) => {
    if (err) throw err;
  });
}

export const returnsErrorMessage = (res: Response, message: string, status: number) => {
  writeErrorLogToFile(`${res.statusCode} ${message} | ${status}`);
  return res.status(status).json({
    status: false,
    message: message
  });
}

export class ApiError extends Error {
  private statusCode: number;
  constructor(name: string, statusCode: number, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
