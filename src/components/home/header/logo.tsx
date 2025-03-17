'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n/routing';

const Logo = () => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <div>
      <Link href={`/${locale}`}>
        <span className="font-logo text-xl lg:text-3xl font-bold tracking-[4px]">
          Dmitriy
        </span>
        <span className="inline-flex bg-primaryHome w-2 h-2 rounded-full"></span>
      </Link>
    </div>
  );
};

export default Logo;
