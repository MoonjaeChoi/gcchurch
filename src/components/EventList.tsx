'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CalendarEvent } from '@/types';
import { getDepartments } from '@/lib/data';
import { formatDate, getEventTypeName, getEventTypeColor } from '@/lib/calendar';
import { Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react';

interface EventListProps {
  events: CalendarEvent[];
  selectedDate: Date | null;
  title?: string;
}

export default function EventList({ events, selectedDate, title }: EventListProps) {
  const departments = getDepartments();

  const getDateTitle = () => {
    if (title) return title;
    if (selectedDate) {
      return formatDate(selectedDate, 'M월 d일 (E)', );
    }
    return '이번 달 일정';
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{getDateTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            일정이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {getDateTitle()} ({events.length}개)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => {
          const dept = departments.find(d => d.id === event.department);
          const typeColor = getEventTypeColor(event.type);

          return (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ borderLeftWidth: '4px', borderLeftColor: dept?.color || typeColor }}
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-base">{event.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {dept && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                      >
                        {dept.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {getEventTypeName(event.type)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 날짜 및 시간 */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date, 'yyyy년 M월 d일 (E)')}</span>
                </div>
                {event.startTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.startTime}</span>
                    {event.endTime && <span>~ {event.endTime}</span>}
                  </div>
                )}
              </div>

              {/* 설명 */}
              {event.description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {event.description}
                </p>
              )}

              {/* 추가 정보 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.attendees && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}명</span>
                  </div>
                )}
                {event.budget && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{(event.budget / 10000).toFixed(0)}만원</span>
                  </div>
                )}
              </div>

              {/* 반복 일정 표시 */}
              {event.recurring && event.recurring.type !== 'none' && (
                <div className="mt-2 pt-2 border-t">
                  <Badge variant="outline" className="text-xs">
                    {event.recurring.type === 'weekly' ? '매주 반복' : '매월 반복'}
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
