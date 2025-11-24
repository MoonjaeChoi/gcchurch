'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MonthCalendar from '@/components/MonthCalendar';
import EventList from '@/components/EventList';
import { getDepartments } from '@/lib/data';
import {
  getCalendarEvents,
  getEventsByMonth,
  getEventsByDate,
  getAvailableYears,
  filterEventsByDepartment,
} from '@/lib/calendar';

export default function CalendarPage() {
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = getDepartments();

  // 선택된 년도의 모든 일정
  const yearEvents = useMemo(
    () => getCalendarEvents(selectedYear),
    [selectedYear]
  );

  // 선택된 월의 일정 (부서 필터 적용)
  const monthEvents = useMemo(() => {
    const events = getEventsByMonth(selectedYear, selectedMonth);
    return filterEventsByDepartment(events, selectedDepartment);
  }, [selectedYear, selectedMonth, selectedDepartment]);

  // 선택된 날짜의 일정 (부서 필터 적용)
  const dateEvents = useMemo(() => {
    if (!selectedDate) return monthEvents;
    const events = getEventsByDate(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    return filterEventsByDepartment(events, selectedDepartment);
  }, [selectedDate, selectedDepartment, monthEvents]);

  const handleYearChange = (year: string) => {
    setSelectedYear(Number(year));
    setSelectedMonth(0); // 년도 변경 시 1월로 리셋
    setSelectedDate(null);
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">교회 일정</h1>
        <p className="text-xl text-muted-foreground">
          과천교회 연간 일정 및 행사 안내
        </p>
      </div>

      {/* 년도 선택 및 필터 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Tabs
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
          className="flex-1"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            {availableYears.map(year => (
              <TabsTrigger key={year} value={year.toString()}>
                {year}년
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 캘린더 및 일정 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 월간 캘린더 */}
        <div className="lg:col-span-2">
          <MonthCalendar
            year={selectedYear}
            month={selectedMonth}
            events={yearEvents}
            onMonthChange={setSelectedMonth}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            selectedDepartment={selectedDepartment}
          />
        </div>

        {/* 일정 목록 */}
        <div className="lg:col-span-1">
          <EventList
            events={dateEvents}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* 일정 추가 안내 */}
      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">📝 일정 추가 방법</h3>
        <p className="text-sm text-muted-foreground mb-3">
          새로운 일정을 추가하려면 다음 파일을 수정해주세요:
        </p>
        <code className="text-sm bg-background px-3 py-1 rounded">
          src/data/calendar/{selectedYear}.json
        </code>
        <p className="text-sm text-muted-foreground mt-3">
          자세한 방법은 프로젝트 관리자에게 문의하세요.
        </p>
      </div>
    </div>
  );
}
