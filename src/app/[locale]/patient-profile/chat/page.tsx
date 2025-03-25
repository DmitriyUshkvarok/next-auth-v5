'use client';

import React, { useState, useEffect, useRef } from 'react';
import PatientProfileLayout from '@/components/patient-profile/PatientProfileLayout';
import { mockMessages } from '@/data/mockPatientData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MESSAGES_PER_PAGE = 20;

const ChatPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('ivanova');
  const [messages, setMessages] = useState<typeof mockMessages>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const loadMessages = () => {
    setLoading(true);
    // Имитация загрузки сообщений
    setTimeout(() => {
      const startIndex = (page - 1) * MESSAGES_PER_PAGE;
      const endIndex = startIndex + MESSAGES_PER_PAGE;
      const newMessages = mockMessages.slice(startIndex, endIndex);

      if (page === 1) {
        setMessages(newMessages);
      } else {
        setMessages((prev) => [...newMessages, ...prev]);
      }

      setHasMore(endIndex < mockMessages.length);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (page === 1) {
      scrollToBottom();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleScroll = () => {
    if (!chatContainerRef.current || loading || !hasMore) return;

    const { scrollTop } = chatContainerRef.current;
    if (scrollTop === 0) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <PatientProfileLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Чат с врачом</h1>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Выберите врача" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ivanova">Др. Иванова</SelectItem>
              <SelectItem value="sidorov">Др. Сидоров</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="/avatars/doctor-ivanova.jpg"
                  alt="Dr. Ivanova"
                />
                <AvatarFallback>ИВ</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Др. Иванова</CardTitle>
                <p className="text-sm text-muted-foreground">Гинеколог</p>
              </div>
            </div>
          </CardHeader>
          <CardContent
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {loading && (
              <div className="flex justify-center py-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'patient' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'patient'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input placeholder="Введите сообщение..." className="flex-1" />
              <Button>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PatientProfileLayout>
  );
};

export default ChatPage;
