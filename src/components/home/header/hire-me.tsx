'use client';
import FormMessageForAdmin from '@/components/account/FormMessageForAdmin';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
const HireMe = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const t = useTranslations('HireMe');
  return (
    <div>
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        autoFocus={openDrawer}
      >
        <DrawerTrigger asChild>
          <Button className="font-body rounded-full font-medium bg-primaryHome">
            {t('hireMe')}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-[600px] px-4">
            <DrawerHeader className="px-0">
              <DrawerTitle className="capitalize">
                {t('hearMeTitle')}
              </DrawerTitle>
              <DrawerDescription>{t('hearMeDescription')}</DrawerDescription>
            </DrawerHeader>
            <FormMessageForAdmin setOpenDrawer={setOpenDrawer} />
            <DrawerFooter className="px-0">
              <DrawerClose asChild>
                <Button
                  className="py-[4px] px-[12px] h-[30px] sm:h-[44px] w-full text-[10px] sm:text-[14px]"
                  variant="outline"
                >
                  {t('cancel')}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HireMe;
