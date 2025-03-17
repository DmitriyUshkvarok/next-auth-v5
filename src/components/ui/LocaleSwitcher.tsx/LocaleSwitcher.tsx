'use client';
import { GrLanguage } from 'react-icons/gr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../button';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';

const LocaleSwitcher = () => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const onLocaleChange = (nextLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params, query: tab ? { tab } : {} },
      { locale: nextLocale as Locale }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="swich button"
          className="bg-transparent outline-none border-none hover:bg-transparent h-[1.5rem] w-[1.5rem]"
        >
          <GrLanguage className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-12 w-20">
        <DropdownMenuItem
          onClick={() => onLocaleChange('en')}
          className="cursor-pointer"
        >
          En
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLocaleChange('uk')}
          className="cursor-pointer"
        >
          Укр
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLocaleChange('ru')}
          className="cursor-pointer"
        >
          Рус
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
