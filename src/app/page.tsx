import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDepartments, getRecentEvents, getAttendanceByDepartment, calculateAttendanceRate } from '@/lib/data';
import { Calendar, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  const departments = getDepartments();
  const recentEvents = getRecentEvents(3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">과천교회 사역 블로그</h1>
        <p className="text-xl text-muted-foreground mb-6">
          남선교회협의회, 안수집사회, 청년부 활동 기록
        </p>
      </div>

      {/* Department Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">부서별 사역</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map(dept => {
            const attendance = getAttendanceByDepartment(dept.id);
            const attendanceRate = calculateAttendanceRate(attendance);
            const latestAttendance = attendance[attendance.length - 1];

            return (
              <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge style={{ backgroundColor: dept.color }}>
                      {dept.name}
                    </Badge>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>평균 출석률: {attendanceRate}%</span>
                    </div>
                    {latestAttendance && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          최근: {latestAttendance.count}/{latestAttendance.total}명
                        </span>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/departments/${dept.id}`}>
                      자세히 보기
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Events */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">최근 활동</h2>
          <Button variant="outline" asChild>
            <Link href="/calendar">전체 일정 보기</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentEvents.map(event => {
            const dept = departments.find(d => d.id === event.department);
            return (
              <Card key={event.id}>
                <CardHeader>
                  {dept && (
                    <Badge className="w-fit mb-2" style={{ backgroundColor: dept.color }}>
                      {dept.name}
                    </Badge>
                  )}
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  {event.attendees && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>참석: {event.attendees}명</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
