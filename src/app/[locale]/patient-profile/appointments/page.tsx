'use client';

import React, { useState } from 'react';
import PatientProfileLayout from '@/components/patient-profile/PatientProfileLayout';
import { mockAppointments } from '@/data/mockPatientData';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Video,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ITEMS_PER_PAGE = 5;

const AppointmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = mockAppointments.filter(
    (appointment) =>
      statusFilter === 'all' || appointment.status === statusFilter
  );

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  return (
    <PatientProfileLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Мои приемы</h1>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все приемы</SelectItem>
              <SelectItem value="upcoming">Предстоящие</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
              <SelectItem value="cancelled">Отмененные</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {currentAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={appointment.doctor.avatar}
                        alt={appointment.doctor.name}
                      />
                      <AvatarFallback>
                        {appointment.doctor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appointment.status === 'completed'
                          ? 'default'
                          : appointment.status === 'upcoming'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {appointment.status === 'completed'
                        ? 'Завершен'
                        : appointment.status === 'upcoming'
                          ? 'Предстоящий'
                          : 'Отменен'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  {appointment.type === 'video' ? (
                    <Video className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {appointment.type === 'video'
                      ? 'Видео консультация'
                      : 'Очный прием'}
                  </span>
                </div>

                {appointment.status === 'upcoming' && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="ghost" className="text-destructive">
                      Отменить
                    </Button>
                    <Button variant="ghost">Перенести</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Страница {currentPage} из {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </PatientProfileLayout>
  );
};

export default AppointmentsPage;
