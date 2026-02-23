import { format, startOfWeek, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCalendar, useCalendarEvents } from '@/hooks';
import type { MockCalendarEvent } from '@/types/calendar';

interface CalendarWeekViewProps {
  className?: string;
}

export function CalendarWeekView({ className }: CalendarWeekViewProps) {
  const { selectedWeek } = useCalendar();
  const { getEventsForDay } = useCalendarEvents();

  // Generate the 7 days of the week starting from Monday
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'client_meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'team_meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'focus_work':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'client_meeting':
        return 'Kundentermin';
      case 'team_meeting':
        return 'Team Meeting';
      case 'focus_work':
        return 'Fokuszeit';
      default:
        return 'Unkategorisiert';
    }
  };

  const formatEventTime = (event: MockCalendarEvent) => {
    const start = format(event.startTime, 'HH:mm');
    const end = format(event.endTime, 'HH:mm');
    return `${start} - ${end}`;
  };

  return (
    <div className={`calendar-week-view ${className || ''}`}>
      {/* Week Header */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="text-center">
            <div className="text-sm font-medium text-gray-500 uppercase">
              {format(day, 'EEE', { locale: de })}
            </div>
            <div className="text-lg font-semibold">
              {format(day, 'd')}
            </div>
            <div className="text-xs text-gray-400">
              {format(day, 'MMM', { locale: de })}
            </div>
          </div>
        ))}
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4 min-h-[600px]">
        {weekDays.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

          return (
            <div
              key={day.toISOString()}
              className={`day-column border rounded-lg p-2 ${
                isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
              }`}
            >
              {dayEvents.map((event) => (
                <Card
                  key={event.id}
                  className={`mb-2 cursor-pointer hover:shadow-md transition-shadow ${
                    event.requiresOfficePresence ? 'border-l-4 border-l-orange-400' : ''
                  }`}
                >
                  <CardHeader className="p-2 pb-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getCategoryColor(event.category)}`}
                      >
                        {getCategoryLabel(event.category)}
                      </Badge>
                      {event.requiresOfficePresence && (
                        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                          Büro
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    <div className="text-xs font-medium text-gray-600 mb-1">
                      {formatEventTime(event)}
                    </div>
                    <div className="text-sm font-semibold line-clamp-2">
                      {event.subject}
                    </div>
                    {event.location && (
                      <div className="text-xs text-gray-500 mt-1">
                        📍 {event.location}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {event.attendees.length > 1 
                        ? `${event.attendees.length} Teilnehmer`
                        : 'Einzeltermin'
                      }
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}