import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalendarNavigation } from '@/hooks';

interface CalendarNavigationProps {
  className?: string;
}

export function CalendarNavigation({ className }: CalendarNavigationProps) {
  const {
    selectedWeek,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
  } = useCalendarNavigation();

  const formatWeekRange = (weekStart: Date) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Same month
    if (weekStart.getMonth() === weekEnd.getMonth()) {
      return `${format(weekStart, 'd')}.-${format(weekEnd, 'd. MMMM yyyy', { locale: de })}`;
    }
    
    // Different months
    return `${format(weekStart, 'd. MMM', { locale: de })} - ${format(weekEnd, 'd. MMM yyyy', { locale: de })}`;
  };

  const isCurrentWeek = () => {
    const today = new Date();
    const todayWeekStart = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    todayWeekStart.setDate(today.getDate() - daysToSubtract);
    
    return format(selectedWeek, 'yyyy-MM-dd') === format(todayWeekStart, 'yyyy-MM-dd');
  };

  return (
    <div className={`calendar-navigation flex items-center justify-between ${className || ''}`}>
      {/* Left side - Week range */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">
            {formatWeekRange(selectedWeek)}
          </h2>
        </div>
        
        {!isCurrentWeek() && (
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Heute
          </Button>
        )}
      </div>

      {/* Right side - Navigation controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          className="hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextWeek}
          className="hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}