import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

const ProfileAvatar = ({
  user,
}: {
  user: { image?: string | null; name?: string | '' };
}) => {
  const avatarSrc = user.image || '';
  const fallbackLetter = user.name ? user.name[0].toUpperCase() : 'U';
  return (
    <Avatar>
      {avatarSrc ? (
        <Image
          className="object-cover"
          src={avatarSrc}
          alt={`${user.name}'s avatar`}
          width={50}
          height={50}
        />
      ) : (
        <AvatarFallback>{fallbackLetter}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default ProfileAvatar;
