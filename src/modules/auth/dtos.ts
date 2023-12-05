import { auth } from '@lib';

export const authSignDTO = ({ name, password }: auth.AdminAuth) => ({ name, password });
