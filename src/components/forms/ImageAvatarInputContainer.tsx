'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import ImageInput from './ImageInput';
import { SubmitButton } from './buttons';
import { LuUser } from 'react-icons/lu';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { updateProfileImageAction } from '@/action/userProfileActions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type ImageInputContainerProps = {
  image: string | null;
  name: string | '';
  text: string;
  children?: React.ReactNode;
};
const ImageAvatarInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const userIcon = (
    <LuUser className="w-24 h-24 bg-primary rounded-md text-white mb-4" />
  );

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfileImageAction(formData);

      if (result.success) {
        await update({
          ...session,
          name: session?.user.name,
          image: result.url,
        });
        router.refresh();
        toast({
          description: `${result?.message}`,
        });
      } else {
        toast({
          variant: 'destructive',
          description: `Error: ${result.message}`,
        });
      }
    });
  };
  return (
    <div className="my-2 flex flex-wrap gap-2 items-center">
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          className="rounded-full object-cover mb-4 w-24 h-24"
          alt={name}
        />
      ) : (
        userIcon
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-lg mt-4">
          <form
            className="flex flex-col"
            action={(formData: FormData) => void handleSubmit(formData)}
          >
            <ImageInput />
            <SubmitButton size="sm" isLoading={isPending} />
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageAvatarInputContainer;
