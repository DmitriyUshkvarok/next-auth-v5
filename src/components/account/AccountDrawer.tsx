'use client';
import { MessageCircle } from 'lucide-react';
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
import FormMessageForAdmin from './FormMessageForAdmin';
import { useState } from 'react';

export function AccountDrawer({
  name,
  email,
  photo,
  role,
}: {
  name: string;
  email: string;
  photo: string;
  role: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      autoFocus={openDrawer}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[24px] h-[24px] px-0">
          <MessageCircle />
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
          <FormMessageForAdmin
            name={name}
            email={email}
            photo={photo}
            role={role}
            setOpenDrawer={setOpenDrawer}
          />
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
  );
}
