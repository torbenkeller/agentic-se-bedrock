import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface DateSelectorProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
  className?: string;
}

export function DateSelector({ selectedDate, onDateSelect, className }: DateSelectorProps) {
  const today = new Date();
  
  // Disable past dates
  const disabledDates = (date: Date) => {
    return date < today;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Datum auswählen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={disabledDates}
          initialFocus
          className="rounded-md border"
        />
        {selectedDate && (
          <p className="mt-3 text-sm text-gray-600">
            Ausgewähltes Datum: {selectedDate.toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}