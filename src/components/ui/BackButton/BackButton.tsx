'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Импортируем иконку
import { Button } from '@/components/ui/button'; // Импортируем компонент кнопки из ShadCN
import { useTranslations } from 'next-intl';

const BackButton = () => {
  const router = useRouter();
  const t = useTranslations('ButtonBack');

  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="flex items-center gap-2 text-primaryHome border-primaryHome"
    >
      <ArrowLeft className="w-4 h-4" />
      {t('title')}
    </Button>
  );
};

export default BackButton;
