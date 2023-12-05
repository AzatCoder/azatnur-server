import util from 'util';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { BusboyFileStream } from '@fastify/busboy';
import { staticPath } from '@lib';

const pump = util.promisify(pipeline);

export const createFile = async (file: BusboyFileStream, fileName: string) => {
  await pump(file, fs.createWriteStream(path.join(staticPath, fileName)));
}
