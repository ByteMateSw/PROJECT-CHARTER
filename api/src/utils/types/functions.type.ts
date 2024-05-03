import { Post } from '../../post/post.entity';
import { User } from '../../user/user.entity';
import { Role } from '../enums/role.enum';

/**
 * Represents a response message with a string message.
 */
export type ResponseMessage = { message: string };

/**
 * Represents a type that requires only one property from a given object type.
 * 
 * @template T - The object type.
 * @returns A type that requires only one property from the given object type.
 */
export type RequireOnlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, undefined>>;
}[keyof T];

/**
 * Represents a type that requires at least one property from the given type.
 * 
 * @template T - The type to require at least one property from.
 * @returns A type that requires at least one property from the given object type.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

/**
 * Represents a type that includes the 'id' and 'email' properties from the User entity.
 */
type EmailAndId = Pick<User, 'id' | 'email'>;

/**
 * Represents a type that includes the 'id', 'username' and 'email' properties from the User entity.
 */
type EmailUsernameAndId = Pick<User, 'id' | 'email' | 'username'>;

/**
 * Represents a type that includes the 'id' and 'title' properties from the Post entity.
 */
type TitleAndId = Pick<Post, 'id' | 'title'>;

/**
 * Represents a type that requires at least one property from the EmailAndId type.
 */
export type EmailUsernameAndOrId = RequireAtLeastOne<EmailUsernameAndId>;

/**
 * Represents a type that requires at least one property from the EmailAndId type.
 */
export type EmailAndOrId = RequireAtLeastOne<EmailAndId>;

/**
 * Represents a type that requires at least one property from the TitleAndId type.
 */
export type TitleAndOrId = RequireAtLeastOne<TitleAndId>;

/**
 * Represents a file uploaded using Express Multer.
 */
export type File = Express.Multer.File;

/**
 * Represents the parameters required for a user, including id, email, and role.
 */
export type UserParam = { id: number; email: string; role: Role };
