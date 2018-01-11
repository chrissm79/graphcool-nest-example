import * as jwt from 'jsonwebtoken';
import { Graphcool } from './generated/graphcool';

export interface Context {
  db: Graphcool;
  request: any;
}

export function getUserId(request: any): string | null {
  const Authorization = request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  return null;
}
