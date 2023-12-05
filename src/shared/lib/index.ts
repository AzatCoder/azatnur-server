import path from 'path';

export * as railway from './railway';
export * as response from './response';
export * as auth from './auth';
export * from './files';
export * from './env';
export const staticPath = path.join(process.cwd(), 'static');
