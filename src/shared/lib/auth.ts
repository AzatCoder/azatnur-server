import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { railway, env } from '@lib';

export interface AdminAuth {
  name: string,
  password: string;
}

export const verifyToken = (token: string) => {
  try {
    jwt.verify(token, env.TOKEN_SECRET);
    return railway.right(undefined);
  } catch {
    return railway.left();
  }
}

export const verifyAdmin = (admin: AdminAuth) => {
  if (
    admin.name !== env.ADMIN_NAME ||
    !bcrypt.compareSync(admin.password, env.ADMIN_PASSWORD)
  ) return railway.left('Wrong name or password');

  return railway.right(undefined);
}

export const signAdmin = (admin: AdminAuth) => {
  const token = jwt.sign(
    { name: admin.name, isAdmin: true },
    env.TOKEN_SECRET,
    { expiresIn: env.TOKEN_EXPIRES_IN }
  );
  return railway.right(token);
}
