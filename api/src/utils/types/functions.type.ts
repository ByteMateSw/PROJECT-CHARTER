import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';

export type ResponseMessage = { message: string };

export type RequireOnlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, undefined>>;
}[keyof T];

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

type EmailAndId = Pick<User, 'id' | 'email'>;
type TitleAndId = Pick<Post, 'id' | 'title'>;

export type EmailAndOrId = RequireAtLeastOne<EmailAndId>;
export type TitleAndOrId = RequireAtLeastOne<TitleAndId>;

export type File = Express.Multer.File;
