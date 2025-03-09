'use server';
import { services } from '@/db/schema/servicesSchema';
import { updateServicesPageSchema } from '@/validation/schemaServicesPage';
import { validateWithZodSchema } from '@/validation/schemas';
import { z } from 'zod';
import db from '@/db/drizzle';
import { getAuthUser, renderError } from '@/lib/authHelpers';
import { getAdminUser } from '@/lib/authHelpers';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const fixedId = 'default';

export const updateServicesList = async (
  data: z.infer<typeof updateServicesPageSchema>
) => {
  try {
    await getAdminUser();
    const getUser = await getAuthUser();

    const updateServicesValidate = validateWithZodSchema(
      updateServicesPageSchema,
      data
    );

    const existingServices = await db
      .select()
      .from(services)
      .where(eq(services.id, fixedId))
      .execute();

    if (existingServices.length > 0) {
      await db
        .update(services)
        .set({
          services: updateServicesValidate.services,
        })
        .where(eq(services.id, fixedId))
        .execute();
    } else {
      await db
        .insert(services)
        .values({
          id: fixedId,
          userId: getUser.id,
          services: updateServicesValidate.services,
        })
        .execute();
    }

    revalidatePath('/');

    return {
      success: true,
      message: 'Services List has been updated successfully',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const getServicesList = async () => {
  const result = await db
    .select()
    .from(services)
    .where(eq(services.id, fixedId))
    .execute();

  if (result.length > 0) {
    return {
      data: result[0].services,
    };
  } else {
    return {
      data: [],
    };
  }
};

export const getServiceByCount = async (count: string) => {
  const result = await db
    .select()
    .from(services)
    .where(eq(services.id, fixedId))
    .execute();

  if (result.length === 0) {
    return {
      success: false,
      message: 'Services list is empty',
      data: null,
    };
  }

  const servicesList = result[0].services || [];
  const service = servicesList.find((item) => item.count.toString() === count);

  return service ? { data: service } : { data: null };
};
