import { Prisma } from '@prisma/client';

export const messageDTO = ({
  by,
  messenger,
  username,
  text,
}: Prisma.MessageCreateInput) => ({ by, messenger, username, text });
