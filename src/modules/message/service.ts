import { Prisma } from '@prisma/client';
import { prisma } from '@db';
import { railway } from '@lib';

export const addMessage = async (message: Prisma.MessageCreateInput) => {
  const createdMessage = await prisma.message.create({ data: message });

  return railway.right(createdMessage);
}
