'use client';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

const HeroResumeButton = ({ resume }: { resume: string | null }) => {
  const t = useTranslations('Resume');
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="uppercase flex items-center gap-2 rounded-full text-primaryHome border-primaryHome"
          >
            <span>{t('resume')}</span>
            <Download />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-8 max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {resume ? (
                <iframe
                  src={resume}
                  width="100%"
                  height="500px"
                  className="rounded-lg border"
                />
              ) : (
                <p className="text-gray-500">No executive summary</p>
              )}
            </DialogTitle>
            <DialogDescription>{t('downloadDescription')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            {resume && (
              <a
                href={resume}
                download="resume.pdf" // Имя файла при скачивании
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                {t('resume')}
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroResumeButton;
