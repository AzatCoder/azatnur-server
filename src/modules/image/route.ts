import { FastifyInstance } from 'fastify';
import { addImage, findAllImages } from './service';
import { response } from '@lib';
import { adminAuth } from '@hooks';

export const imagesRoute = async (fastifyApp: FastifyInstance) => {
  fastifyApp.get('/', async (req, rep) => {
    const result = await findAllImages();
    const resp = response.success(result.data);

    return rep.send(resp);
  });

  fastifyApp.post('/', { preHandler: adminAuth }, async (req, rep) => {
    const data = await req.file();

    if (!data) {
      return rep.status(403).send();
    }

    const result = await addImage({
      file: data.file,
      fileName: data.filename,
      name: data.fieldname
    });

    if (!result.success) {
      const resp = response.failure(result.reason);

      return rep.status(403).send(resp);
    }

    const resp = response.success(result.data);

    return rep.send(resp);
  });
}
