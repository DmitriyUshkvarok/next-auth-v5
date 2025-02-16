'use server';
import { auth } from '../../auth';

export type ResponseStatus = {
  success?: false;
  message: string;
  tokenInvalid?: false;
};

export const renderError = async (error: unknown): Promise<ResponseStatus> => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
    success: false,
  };
};
export const getAdminUser = async () => {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    throw new Error('Недостаточно прав');
  }
  return session;
};

export const getAuthUser = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('You must be logged in to access this route');
  }

  return session.user;
};
