import React from 'react';
import PatientProfileLayout from '@/components/patient-profile/PatientProfileLayout';
import {
  mockPatient,
  mockAppointments,
  mockDiagnoses,
} from '@/data/mockPatientData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  User,
} from 'lucide-react';

const PatientProfilePage = () => {
  return (
    <PatientProfileLayout>
      <div className="space-y-6">
        {/* Patient Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bol">
                  {mockPatient.name}
                </h2>
                <p className="text-gray-500">ID пациента: {mockPatient.id}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{mockPatient.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{mockPatient.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{mockPatient.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">
                  Дата рождения: {mockPatient.dateOfBirth}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Последняя активность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recent Appointments */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500">
                Последние приемы
              </h4>
              {mockAppointments.slice(0, 2).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={appointment.doctor.avatar}
                        alt={appointment.doctor.name}
                      />
                      <AvatarFallback>
                        {appointment.doctor.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.doctor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.doctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.date} {appointment.time}
                    </p>
                    <Badge
                      variant={
                        appointment.type === 'video' ? 'secondary' : 'default'
                      }
                    >
                      {appointment.type === 'video'
                        ? 'Видео консультация'
                        : 'Очный прием'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Diagnoses */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500">
                Последние диагнозы
              </h4>
              {mockDiagnoses.slice(0, 2).map((diagnosis) => (
                <div key={diagnosis.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ClipboardList className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {diagnosis.diagnosis}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {diagnosis.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{diagnosis.aiSummary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientProfileLayout>
  );
};

export default PatientProfilePage;
