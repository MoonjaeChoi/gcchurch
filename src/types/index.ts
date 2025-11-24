// 부서 타입
export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
}

// 행사 타입
export interface Event {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  department: string; // department id
  attendees?: number;
  budget?: number;
  images?: string[];
  description?: string;
}

// 블로그 포스트 타입
export interface Post {
  slug: string;
  title: string;
  date: string; // ISO 8601 format
  department: string; // department id
  tags: string[];
  excerpt?: string;
  content: string;
  images?: string[];
  attendees?: number;
  budget?: number;
}

// 출석 기록 타입
export interface AttendanceRecord {
  date: string; // YYYY-MM format
  department: string; // department id
  count: number;
  total?: number; // 총 회원 수 (선택)
}

// 예산 타입
export interface BudgetRecord {
  year: number;
  department: string; // department id
  allocated: number; // 할당된 예산
  spent: number; // 사용한 예산
  category?: string; // 예산 카테고리 (선택)
}

// 통계 요약 타입
export interface DepartmentStats {
  department: string;
  totalEvents: number;
  averageAttendance: number;
  totalBudget: number;
  recentPosts: number;
}
