import { put } from '@vercel/blob';
import { validateWithZodSchema } from '@/validation/schemas';
import { pdfSchema } from '@/validation/schemasHomePage';

export const uploadResumeToBlob = async (file: File, folder: string) => {
  // Валидация файла
  const validatedFieldsResume = validateWithZodSchema(pdfSchema, {
    resume: file,
  });

  const fileName = `${folder}/${Date.now()}.pdf`;

  const blob = await put(fileName, validatedFieldsResume.resume, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
};
