import { Type } from '@sinclair/typebox';

const user = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  username: Type.String({ maxLength: 20 }),
});

export const loginUserBody = Type.Pick(user, ['email', 'password']);

export const patchUserBody = Type.Optional(
  Type.Pick(user, ['username', 'password', 'username']),
);

export const signUpUserBody = Type.Pick(user, ['username', 'email', 'password']);
