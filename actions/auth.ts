'use server';

import { signin, signup } from '@/utils/authTools';
import { COOKIE_NAME } from '@/utils/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TMessage = { message?: string | null };

/**
 *
 * @param prevState Previous state of the form
 * @param formData Current form data
 */
export const registerUser = async (
  prevState: any,
  formData: FormData
): Promise<TMessage> => {
  try {
    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const { token } = await signup(data);
    cookies().set(COOKIE_NAME, token);
  } catch (error) {
    console.error(error);
    return { message: 'Failed to sing you up' };
  }
  redirect('/dashboard');
};

export const signinUser = async (
  prevState: any,
  formData: FormData
): Promise<TMessage> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  try {
    const { token } = await signin(data);
    cookies().set(COOKIE_NAME, token);
  } catch (error) {
    console.error(error);
    return { message: 'Failed to sign you in' };
  }
  redirect('/dashboard');
};
