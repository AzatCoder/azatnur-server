import crypto from 'crypto';
import { BusboyFileStream } from '@fastify/busboy';
import { prisma } from '@db';
import { railway, createFile } from '@lib';

export const addImage = async ({
  file,
  fileName,
  name
}: {
  file: BusboyFileStream,
  fileName: string,
  name: string
}) => {
  const sameNameImage = await prisma.image.findFirst({ where: { name } });
  if (sameNameImage) return railway.left(`Has the same name: ${name}`);

  const uuid = crypto.randomUUID();
  const extension = fileName.split('.').pop();
  const renamedFile = `${uuid}.${extension}`;

  await createFile(file, renamedFile);

  const createdImage = await prisma.image.create({
    data: {
      id: uuid,
      fileName: renamedFile,
      name
    }
  });

  return railway.right(createdImage);
}

export const findAllImages = async () => {
  const allImages = await prisma.image.findMany();
  
  return railway.right(allImages);
}