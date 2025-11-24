'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CalendarEvent } from '@/types';
import {
  getCalendarGrid,
  getEventsByDate,
  formatDate,
  getEventTypeColor,
} from '@/lib/calendar';
import { getDepartments } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthCalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  onMonthChange: (month: number) => void;
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
  selectedDepartment: string;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

export default function MonthCalendar({
  year,
  month,
  events,
  onMonthChange,
  onDateSelect,
  selectedDate,
  selectedDepartment,
}: MonthCalendarProps) {
  const calendarDays = getCalendarGrid(year, month);
  const departments = getDepartments();

  const handlePrevMonth = () => {
    if (month === 0) return; // 1월에서 더 이전으로 가지 않음
    onMonthChange(month - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) return; // 12월에서 더 다음으로 가지 않음
    onMonthChange(month + 1);
  };

  const getDayEvents = (date: Date) => {
    const dayEvents = getEventsByDate(year, month, date.getDate());

    // 부서 필터 적용
    if (selectedDepartment === 'all') {
      return dayEvents;
    }
    return dayEvents.filter(
      event => event.department === selectedDepartment || event.department === 'all'
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            disabled={month === 0}
            className="p-2 hover:bg-muted rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <CardTitle>{MONTH_NAMES[month]}</CardTitle>
          <button
            onClick={handleNextMonth}
            disabled={month === 11}
            className="p-2 hover:bg-muted rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={`text-center text-sm font-semibold py-2 ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayEvents = getDayEvents(date);
            const isSelected = selectedDate &&
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();
            const isToday = new Date().toDateString() === date.toDateString();
            const dayOfWeek = date.getDay();

            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`
                  aspect-square p-2 rounded-md border transition-colors
                  ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}
                  ${isToday && !isSelected ? 'border-primary border-2' : ''}
                `}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`text-sm font-medium ${
                      dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''
                    } ${isSelected ? 'text-primary-foreground' : ''}`}
                  >
                    {date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dayEvents.slice(0, 3).map((event) => {
                        const dept = departments.find(d => d.id === event.department);
                        return (
                          <div
                            key={event.id}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: dept?.color || getEventTypeColor(event.type),
                            }}
                            title={event.title}
                          />
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{dayEvents.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
