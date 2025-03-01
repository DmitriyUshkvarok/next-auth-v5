'use server';

import { renderError } from '@/lib/authHelpers';
import {
  sendFormForAdminSchema,
  validateWithZodSchema,
} from '@/validation/schemas';
import { z } from 'zod';
import { mailer } from '@/lib/email';

export const sendFormForAdmin = async (
  data: z.infer<typeof sendFormForAdminSchema>
) => {
  try {
    const validatedMessage = validateWithZodSchema(
      sendFormForAdminSchema,
      data
    );

    const mailOptions = {
      from: validatedMessage.email,
      to: process.env.NEXT_PUBLIC_UKR_NET_EMAIL_USER, // Замените на реальный email администратора
      subject: 'Новое сообщение от пользователя',
      html: `
        <h2>Новое сообщение</h2>
        <p><strong>Имя:</strong> ${validatedMessage.name}</p>
        <p><strong>Email:</strong> ${validatedMessage.email}</p>
        <p><strong>Роль:</strong> ${validatedMessage.role}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${validatedMessage.message}</p>
        ${validatedMessage.photo ? `<p><strong>Фото:</strong> <img src="${validatedMessage.photo}" alt="Фото пользователя" /></p>` : ''}
      `,
    };
    await mailer.sendMail(mailOptions);

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    return renderError(error);
  }
};
