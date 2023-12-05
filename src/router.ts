import path from 'path';
import fs from 'fs';
import { FastifyInstance } from 'fastify';
import { Module } from '@types';

const getAllModules = async () => {
  const routesPath = path.join(__dirname, '/modules');
  const moduleNames = fs.readdirSync(routesPath);
  const modules: Module[] = [];

  for (let i = 0; i < moduleNames.length; i++) {
    const moduleName = moduleNames[i];
    const modulePath = `${routesPath}/${moduleName}`;
    try {
      const module = (await import(modulePath)).default;
      modules.push(module);
    } catch {
      console.error(`Couldn't parse module '${moduleName}'`);
      if (process.env.NODE_ENV === 'production') process.exit(1);
    }
  };

  return modules;
}

export const router = async (fastifyApp: FastifyInstance) => {
  const modules = await getAllModules();
  
  modules.forEach(({ route, prefix }) => fastifyApp.register(route, { prefix }));
}