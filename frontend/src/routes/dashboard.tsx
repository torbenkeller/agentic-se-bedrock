import { LocationList } from '@/components/location';
import { Settings } from '@/components/settings';
import * as React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCalendarEvents } from '@/hooks';
import { mockCalendarHighlights } from '@/lib/mock-data/calendar-events';

export function Dashboard() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { getEventsForDay } = useCalendarEvents();
  const dayEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const getHighlightedDates = () => {
    const highlightedDates: Date[] = [];
    mockCalendarHighlights.forEach(event => {
      highlightedDates.push(new Date(event.startTime));
    });
    return highlightedDates;
  };
  const formatEventTime = (startTime: Date, endTime: Date) => {
    const start = format(startTime, 'HH:mm');
    const end = format(endTime, 'HH:mm');
    return `${start} - ${end}`;
  };
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'client_meeting':
        return 'bg-blue-100 text-blue-800';
      case 'team_meeting':
        return 'bg-green-100 text-green-800';
      case 'focus_work':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'client_meeting':
        return 'Kunde';
      case 'team_meeting':
        return 'Team';
      case 'focus_work':
        return 'Fokus';
      default:
        return 'Sonstiges';
    }
  };
  return (
    <div className="h-full w-full flex bg-gray-50 overflow-hidden">
      {/* Left: dashboard content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 1</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 2</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 3</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 4</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 5</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Dashboard Widget 6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: calendar panel */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4">
          <Card className="w-full gap-3 py-3">
            <CardContent className="px-0 py-2 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="bg-transparent p-0 m-0"
                locale={de}
                modifiers={{
                  highlighted: getHighlightedDates(),
                  today: new Date()
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    fontWeight: 'bold',
                    borderRadius: '6px'
                  },
                  today: {
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    borderRadius: '6px'
                  }
                }}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="text-sm font-medium">
                  {selectedDate?.toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  title="Termin hinzufügen"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Termin hinzufügen</span>
                </Button>
              </div>
              <div className="flex w-full flex-col gap-2">
                {dayEvents.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-4">
                    Keine Termine für diesen Tag
                  </div>
                ) : (
                  dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`relative rounded-md p-3 text-sm border-l-4 ${
                        event.requiresOfficePresence 
                          ? 'border-l-orange-400 bg-orange-50' 
                          : 'border-l-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
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
                      <div className="font-medium text-gray-900 mb-1">
                        {event.subject}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {formatEventTime(event.startTime, event.endTime)}
                      </div>
                      {event.location && (
                        <div className="text-xs text-gray-500">
                          📍 {event.location}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {event.attendees.length > 1 
                          ? `${event.attendees.length} Teilnehmer`
                          : 'Einzeltermin'
                        }
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Bookings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Buchungen</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <span className="text-gray-500">Buchungs-Übersicht wird hier angezeigt</span>
      </div>
    </div>
  );
}

export function LocationsRoute() {
  return <LocationList />;
}

export function SettingsRoute() {
  return <Settings />;
}