export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  rating: number;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  status: 'completed' | 'upcoming' | 'cancelled';
}

export interface Diagnosis {
  id: string;
  doctor: Doctor;
  diagnosis: string;
  date: string;
  symptoms: string[];
  recommendations: string[];
  treatment: string;
  aiSummary: string;
}

export interface MedicalFile {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  content: string;
  time: string;
}

export const mockPatient: Patient = {
  id: 'P123456',
  name: 'Анна Петрова',
  email: 'anna.petrova@example.com',
  phone: '+38 (099) 123-45-67',
  address: 'г. Киев, ул. Героев Украины, д. 10, кв. 5',
  dateOfBirth: '15.03.1990',
};

const mockDoctors: Doctor[] = [
  {
    id: 'D1',
    name: 'Др. Иванова',
    specialization: 'Гинеколог',
    avatar: '/avatars/doctor-ivanova.jpg',
    rating: 4.8,
  },
  {
    id: 'D2',
    name: 'Др. Сидоров',
    specialization: 'Терапевт',
    avatar: '/avatars/doctor-sidorov.jpg',
    rating: 4.9,
  },
  {
    id: 'D3',
    name: 'Др. Смирнова',
    specialization: 'Кардиолог',
    avatar: '/avatars/doctor-smirnova.jpg',
    rating: 4.7,
  },
  {
    id: 'D4',
    name: 'Др. Петров',
    specialization: 'Невролог',
    avatar: '/avatars/doctor-petrov.jpg',
    rating: 4.6,
  },
  {
    id: 'D5',
    name: 'Др. Козлова',
    specialization: 'Офтальмолог',
    avatar: '/avatars/doctor-kozlova.jpg',
    rating: 4.9,
  },
];

const generateAppointments = (count: number): Appointment[] => {
  const appointments: Appointment[] = [];
  const types: ('video' | 'in-person')[] = ['video', 'in-person'];
  const statuses: ('completed' | 'upcoming' | 'cancelled')[] = [
    'completed',
    'upcoming',
    'cancelled',
  ];
  const dates = [
    '01.03.2024',
    '05.03.2024',
    '10.03.2024',
    '15.03.2024',
    '20.03.2024',
    '25.03.2024',
    '30.03.2024',
    '05.04.2024',
    '10.04.2024',
    '15.04.2024',
  ];
  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  for (let i = 0; i < count; i++) {
    appointments.push({
      id: `A${i + 1}`,
      doctor: mockDoctors[Math.floor(Math.random() * mockDoctors.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      time: times[Math.floor(Math.random() * times.length)],
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return appointments;
};

const generateDiagnoses = (count: number): Diagnosis[] => {
  const diagnoses: Diagnosis[] = [];
  const diagnosisTypes = [
    'ОРВИ',
    'Гипертония',
    'Сахарный диабет',
    'Бронхит',
    'Гастрит',
    'Ангина',
    'Отит',
    'Конъюнктивит',
    'Аллергия',
    'Мигрень',
  ];
  const symptoms = [
    'Головная боль',
    'Температура',
    'Кашель',
    'Насморк',
    'Боль в горле',
    'Слабость',
    'Тошнота',
    'Головокружение',
    'Боль в животе',
    'Сыпь',
  ];
  const recommendations = [
    'Принимать назначенные препараты',
    'Соблюдать постельный режим',
    'Пить больше жидкости',
    'Избегать физических нагрузок',
    'Соблюдать диету',
    'Регулярно измерять давление',
    'Контролировать уровень сахара',
    'Делать ингаляции',
    'Принимать витамины',
    'Соблюдать гигиену',
  ];

  for (let i = 0; i < count; i++) {
    const randomSymptoms = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => symptoms[Math.floor(Math.random() * symptoms.length)]
    );
    const randomRecommendations = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => recommendations[Math.floor(Math.random() * recommendations.length)]
    );

    diagnoses.push({
      id: `D${i + 1}`,
      doctor: mockDoctors[Math.floor(Math.random() * mockDoctors.length)],
      diagnosis:
        diagnosisTypes[Math.floor(Math.random() * diagnosisTypes.length)],
      date: new Date(2024, 0, 1 + i).toLocaleDateString('ru-RU'),
      symptoms: randomSymptoms,
      recommendations: randomRecommendations,
      treatment: 'Назначен курс лечения согласно диагнозу',
      aiSummary: 'AI проанализировал симптомы и подтвердил диагноз врача',
    });
  }

  return diagnoses;
};

const generateFiles = (count: number): MedicalFile[] => {
  const files: MedicalFile[] = [];
  const fileTypes = ['Анализ крови', 'Рентген', 'МРТ', 'УЗИ', 'ЭКГ', 'Справка'];
  const dates = [
    '01.03.2024',
    '05.03.2024',
    '10.03.2024',
    '15.03.2024',
    '20.03.2024',
    '25.03.2024',
    '30.03.2024',
    '05.04.2024',
    '10.04.2024',
    '15.04.2024',
  ];

  for (let i = 0; i < count; i++) {
    files.push({
      id: `F${i + 1}`,
      name: `${fileTypes[Math.floor(Math.random() * fileTypes.length)]} ${i + 1}`,
      type: fileTypes[Math.floor(Math.random() * fileTypes.length)],
      date: dates[Math.floor(Math.random() * dates.length)],
      size: `${Math.floor(Math.random() * 5) + 1} MB`,
    });
  }

  return files;
};

const generateMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  const contents = [
    'Здравствуйте, как я могу помочь?',
    'Спасибо за обращение',
    'Пожалуйста, опишите ваши симптомы',
    'Когда начались первые признаки?',
    'Принимаете ли вы какие-либо препараты?',
    'Есть ли у вас аллергия на лекарства?',
    'Как часто вы болеете?',
    'Какие хронические заболевания у вас есть?',
    'Спасибо за подробное описание',
    'Я назначу вам необходимые анализы',
  ];

  for (let i = 0; i < count; i++) {
    messages.push({
      id: `M${i + 1}`,
      sender: i % 2 === 0 ? 'doctor' : 'patient',
      content: contents[Math.floor(Math.random() * contents.length)],
      time: new Date(2024, 0, 1 + Math.floor(i / 10)).toLocaleTimeString(
        'ru-RU',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
    });
  }

  return messages;
};

export const mockAppointments = generateAppointments(20);
export const mockDiagnoses = generateDiagnoses(15);
export const mockFiles = generateFiles(25);
export const mockMessages = generateMessages(50);
