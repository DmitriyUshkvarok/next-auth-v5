'use client';

import React, { useState } from 'react';
import PatientProfileLayout from '@/components/patient-profile/PatientProfileLayout';
import { mockDiagnoses } from '@/data/mockPatientData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ITEMS_PER_PAGE = 3;

const DiagnosesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');

  const filteredDiagnoses = mockDiagnoses.filter((diagnosis) => {
    if (dateFilter === 'all') return true;
    const diagnosisDate = new Date(diagnosis.date);
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

    if (dateFilter === 'recent') {
      return diagnosisDate >= threeMonthsAgo;
    }
    if (dateFilter === 'year') {
      return diagnosisDate >= oneYearAgo;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredDiagnoses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDiagnoses = filteredDiagnoses.slice(startIndex, endIndex);

  return (
    <PatientProfileLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Мои диагнозы</h1>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фильтр по дате" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все диагнозы</SelectItem>
              <SelectItem value="recent">Последние 3 месяца</SelectItem>
              <SelectItem value="year">За последний год</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {currentDiagnoses.map((diagnosis) => (
            <Card key={diagnosis.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={diagnosis.doctor.avatar}
                        alt={diagnosis.doctor.name}
                      />
                      <AvatarFallback>
                        {diagnosis.doctor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {diagnosis.diagnosis}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {diagnosis.doctor.name} •{' '}
                        {diagnosis.doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{diagnosis.date}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Симптомы
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Рекомендации
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {diagnosis.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Назначенное лечение
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {diagnosis.treatment}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    AI-заключение
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {diagnosis.aiSummary}
                  </p>
                </div>
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

export default DiagnosesPage;
