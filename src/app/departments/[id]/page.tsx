import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getDepartment,
  getEventsByDepartment,
  getAttendanceByDepartment,
  getBudgetByDepartment,
  calculateAttendanceRate,
} from '@/lib/data';
import { Calendar, Users, DollarSign, TrendingUp, ArrowLeft } from 'lucide-react';
import AttendanceChart from '@/components/AttendanceChart';
import BudgetChart from '@/components/BudgetChart';

export async function generateStaticParams() {
  return [
    { id: 'men-mission' },
    { id: 'deacons' },
    { id: 'youth' },
  ];
}

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const department = getDepartment(params.id);

  if (!department) {
    notFound();
  }

  const events = getEventsByDepartment(params.id);
  const attendance = getAttendanceByDepartment(params.id);
  const budget = getBudgetByDepartment(params.id, 2025);
  const attendanceRate = calculateAttendanceRate(attendance);
  const latestAttendance = attendance[attendance.length - 1];
  const currentBudget = budget[0];

  // 최근 이벤트 (날짜순 정렬)
  const recentEvents = events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <Badge className="mb-4" style={{ backgroundColor: department.color }}>
          {department.name}
        </Badge>
        <h1 className="text-4xl font-bold mb-2">{department.name}</h1>
        <p className="text-xl text-muted-foreground">{department.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Attendance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 출석률</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            {latestAttendance && (
              <p className="text-xs text-muted-foreground mt-1">
                최근: {latestAttendance.count}/{latestAttendance.total}명
              </p>
            )}
          </CardContent>
        </Card>

        {/* Budget Card */}
        {currentBudget && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">2025년 예산 집행</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((currentBudget.spent / currentBudget.allocated) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {(currentBudget.spent / 10000).toFixed(0)}만원 /{' '}
                {(currentBudget.allocated / 10000).toFixed(0)}만원
              </p>
            </CardContent>
          </Card>
        )}

        {/* Events Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 행사</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              기록된 행사 수
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">최근 활동</h2>
        <div className="space-y-4">
          {recentEvents.map(event => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </CardDescription>
                  </div>
                  {event.attendees && (
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {event.attendees}명
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {event.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {event.budget && (
                    <p className="text-sm text-muted-foreground mt-2">
                      예산: {(event.budget / 10000).toFixed(0)}만원
                    </p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>출석 추이</CardTitle>
            <CardDescription>월별 출석 인원 및 출석률</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceChart data={attendance} color={department.color} />
          </CardContent>
        </Card>

        {/* Budget Chart */}
        {budget.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>예산 집행 현황</CardTitle>
              <CardDescription>연도별 예산 할당 및 집행</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart data={getBudgetByDepartment(params.id)} color={department.color} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Attendance History */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">출석 기록</h2>
        <Card>
          <CardHeader>
            <CardTitle>월별 출석 현황</CardTitle>
            <CardDescription>최근 4개월</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attendance.slice(-4).map(record => {
                const rate = record.total
                  ? Math.round((record.count / record.total) * 100)
                  : 0;
                return (
                  <div key={record.date} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{record.date}</span>
                      <span className="text-sm text-muted-foreground">
                        {record.count} / {record.total}명
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
