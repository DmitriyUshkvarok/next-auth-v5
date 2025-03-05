import {
  FaLinkedin,
  FaGithub,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

type SocialIconProps = {
  name: string;
};

export const getSocialIcon = ({ name }: SocialIconProps): IconType | null => {
  switch (name.toLowerCase()) {
    case 'linkedin':
      return FaLinkedin;
    case 'github':
      return FaGithub;
    case 'telegram':
      return FaTelegram;
    case 'whatsapp':
      return FaWhatsapp;
    case 'instagram':
      return FaInstagram;
    default:
      return null;
  }
};
