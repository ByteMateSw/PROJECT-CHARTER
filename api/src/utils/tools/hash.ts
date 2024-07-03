import * as argon2 from 'argon2';

export async function hashData(data: string): Promise<string> {
  return await argon2.hash(data);
}

export async function verifyData(hash: string, data: string): Promise<boolean> {
  return await argon2.verify(hash, data);
}
