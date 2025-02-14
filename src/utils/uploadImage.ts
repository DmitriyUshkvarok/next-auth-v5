import { put } from '@vercel/blob';
import { imageSchema, validateWithZodSchema } from '@/validation/schemas';

export const uploadImageToBlob = async (file: File, folder: string) => {
  // Валидация изображения
  const validatedFieldsImage = validateWithZodSchema(imageSchema(), {
    image: file,
  });

  const fileExtension = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${fileExtension}`;

  const blob = await put(fileName, validatedFieldsImage.image, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
};
