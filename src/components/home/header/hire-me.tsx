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

import { useState } from 'react';
const HireMe = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        autoFocus={openDrawer}
      >
        <DrawerTrigger asChild>
          <Button className="font-body rounded-full font-medium bg-primaryHome">
            Hire Me
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-[600px] px-4">
            <DrawerHeader>
              <DrawerTitle className="capitalize">
                Communication with the administrator
              </DrawerTitle>
              <DrawerDescription>
                Fill out the form and send a message.
              </DrawerDescription>
            </DrawerHeader>
            <FormMessageForAdmin setOpenDrawer={setOpenDrawer} />
            <DrawerFooter className="px-0">
              <DrawerClose asChild>
                <Button
                  className="py-[4px] px-[12px] h-[30px] sm:h-[44px] w-full text-[10px] sm:text-[14px]"
                  variant="outline"
                >
                  Cancel
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
