export type ResponseMessage = { message: string };

export type EmailAndOrId =
  | { id: number; email?: string }
  | { id?: number; email: string };
