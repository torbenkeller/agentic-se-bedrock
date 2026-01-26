import { Home, MapPin, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'locations', label: 'Standorte', icon: MapPin },
  { id: 'bookings', label: 'Buchungen', icon: BarChart3 },
  { id: 'settings', label: 'Einstellungen', icon: Settings },
];

export function MainNavigation() {
  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const to = item.id === 'dashboard' ? '/' : `/${item.id}`;

          return (
            <NavLink key={item.id} to={to} end={item.id === 'dashboard'} className="block">
              {({ isActive }: { isActive: boolean }) => (
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-10',
                    isActive ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}