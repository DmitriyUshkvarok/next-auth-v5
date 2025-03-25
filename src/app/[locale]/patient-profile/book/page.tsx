'use client';

import React from 'react';
import PatientProfileLayout from '@/components/patient-profile/PatientProfileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Video, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockDoctors = [
  {
    id: 1,
    name: 'Др. Иванова',
    specialization: 'Гинеколог',
    avatar: '/avatars/doctor-ivanova.jpg',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Др. Сидоров',
    specialization: 'Терапевт',
    avatar: '/avatars/doctor-sidorov.jpg',
    rating: 4.9,
  },
];

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const BookPage = () => {
  return (
    <PatientProfileLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Запись на прием</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Выберите врача</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{doctor.rating}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Детали приема</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Очный прием
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  Видео консультация
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Дата приема</label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Время приема</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Причина обращения</label>
                <Input
                  placeholder="Опишите причину вашего обращения"
                  className="h-24"
                />
              </div>

              <Button className="w-full">Подтвердить запись</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientProfileLayout>
  );
};

export default BookPage;
