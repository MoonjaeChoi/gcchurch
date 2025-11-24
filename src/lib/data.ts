import type { Department, Event, AttendanceRecord, BudgetRecord } from '@/types';
import departmentsData from '@/data/departments.json';
import eventsData from '@/data/events.json';
import attendanceData from '@/data/attendance.json';
import budgetData from '@/data/budget.json';

export function getDepartments(): Department[] {
  return departmentsData as Department[];
}

export function getDepartment(id: string): Department | undefined {
  return getDepartments().find(dept => dept.id === id);
}

export function getEvents(): Event[] {
  return eventsData as Event[];
}

export function getEventsByDepartment(departmentId: string): Event[] {
  return getEvents().filter(event => event.department === departmentId);
}

export function getAttendance(): AttendanceRecord[] {
  return attendanceData as AttendanceRecord[];
}

export function getAttendanceByDepartment(departmentId: string): AttendanceRecord[] {
  return getAttendance().filter(record => record.department === departmentId);
}

export function getBudget(): BudgetRecord[] {
  return budgetData as BudgetRecord[];
}

export function getBudgetByDepartment(departmentId: string, year?: number): BudgetRecord[] {
  let records = getBudget().filter(record => record.department === departmentId);
  if (year) {
    records = records.filter(record => record.year === year);
  }
  return records;
}

// 통계 계산 함수들
export function calculateAttendanceRate(records: AttendanceRecord[]): number {
  if (records.length === 0) return 0;
  const totalRate = records.reduce((sum, record) => {
    if (!record.total || record.total === 0) return sum;
    return sum + (record.count / record.total) * 100;
  }, 0);
  return Math.round(totalRate / records.length);
}

export function getRecentEvents(limit: number = 5): Event[] {
  return getEvents()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
