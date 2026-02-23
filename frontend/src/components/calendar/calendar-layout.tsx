import { CalendarNavigation } from './calendar-navigation';
import { CalendarWeekView } from './calendar-week-view';

interface CalendarLayoutProps {
  className?: string;
}

export function CalendarLayout({ className }: CalendarLayoutProps) {
  return (
    <div className={`calendar-layout space-y-6 ${className || ''}`}>
      {/* Navigation */}
      <CalendarNavigation />
      
      {/* Week View */}
      <CalendarWeekView />
    </div>
  );
}