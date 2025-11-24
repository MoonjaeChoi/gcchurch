import type { CalendarEvent } from '@/types';
import calendar2025 from '@/data/calendar/2025.json';
import calendar2026 from '@/data/calendar/2026.json';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  getYear,
  getMonth,
} from 'date-fns';
import { ko } from 'date-fns/locale';

// 년도별 캘린더 데이터 맵
const calendarData: Record<number, CalendarEvent[]> = {
  2025: calendar2025 as CalendarEvent[],
  2026: calendar2026 as CalendarEvent[],
};

/**
 * 특정 년도의 모든 일정 가져오기
 */
export function getCalendarEvents(year: number): CalendarEvent[] {
  return calendarData[year] || [];
}

/**
 * 특정 년도와 월의 일정 가져오기
 */
export function getEventsByMonth(year: number, month: number): CalendarEvent[] {
  const events = getCalendarEvents(year);
  return events.filter(event => {
    const eventDate = parseISO(event.date);
    return getYear(eventDate) === year && getMonth(eventDate) === month;
  });
}

/**
 * 특정 날짜의 일정 가져오기
 */
export function getEventsByDate(year: number, month: number, day: number): CalendarEvent[] {
  const events = getEventsByMonth(year, month);
  const targetDate = new Date(year, month, day);

  return events.filter(event => {
    const eventDate = parseISO(event.date);
    return isSameDay(eventDate, targetDate);
  });
}

/**
 * 부서별 일정 필터링
 */
export function filterEventsByDepartment(
  events: CalendarEvent[],
  departmentId: string
): CalendarEvent[] {
  if (departmentId === 'all') return events;
  return events.filter(event => event.department === departmentId || event.department === 'all');
}

/**
 * 월간 달력 날짜 배열 생성
 */
export function getMonthDays(year: number, month: number) {
  const firstDay = startOfMonth(new Date(year, month, 1));
  const lastDay = endOfMonth(new Date(year, month, 1));

  return eachDayOfInterval({ start: firstDay, end: lastDay });
}

/**
 * 달력 표시를 위한 주별 날짜 배열 생성 (앞뒤 빈 날짜 포함)
 */
export function getCalendarGrid(year: number, month: number) {
  const days = getMonthDays(year, month);
  const firstDay = days[0];
  const lastDay = days[days.length - 1];

  // 첫째 주 시작 요일 (일요일 = 0)
  const startDayOfWeek = firstDay.getDay();
  // 마지막 주 종료 요일
  const endDayOfWeek = lastDay.getDay();

  // 앞쪽 빈 날짜 추가
  const prefix = Array(startDayOfWeek).fill(null);
  // 뒤쪽 빈 날짜 추가
  const suffix = Array(6 - endDayOfWeek).fill(null);

  return [...prefix, ...days, ...suffix];
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ko });
}

/**
 * 일정 타입에 따른 색상 가져오기
 */
export function getEventTypeColor(type: CalendarEvent['type']): string {
  const colors: Record<CalendarEvent['type'], string> = {
    worship: '#8b5cf6', // 보라
    meeting: '#3b82f6', // 파랑
    event: '#10b981', // 초록
    service: '#f59e0b', // 주황
    retreat: '#ec4899', // 분홍
    etc: '#6b7280', // 회색
  };

  return colors[type] || colors.etc;
}

/**
 * 일정 타입 한글명
 */
export function getEventTypeName(type: CalendarEvent['type']): string {
  const names: Record<CalendarEvent['type'], string> = {
    worship: '예배',
    meeting: '모임',
    event: '행사',
    service: '봉사',
    retreat: '수련회',
    etc: '기타',
  };

  return names[type] || names.etc;
}

/**
 * 사용 가능한 년도 목록
 */
export function getAvailableYears(): number[] {
  return Object.keys(calendarData).map(Number).sort();
}
