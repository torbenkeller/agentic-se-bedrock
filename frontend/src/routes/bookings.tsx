import { Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Simple placeholder bookings to demonstrate nested routing.
// Replace with real data and React Query fetch-on-render later.
type MockBooking = { id: string; title: string; date: string };

const mockBookings: MockBooking[] = [
  { id: 'bkg-001', title: 'Besprechungsraum A — 10:00–11:00', date: '2025-09-15' },
  { id: 'bkg-002', title: 'Fokus-Pod 3 — 14:00–15:30', date: '2025-09-16' },
];

// Layout: Left side shows bookings list, right side renders nested route (detail)
export function BookingsLayout() {
  return (
    <div className="h-full w-full flex bg-gray-50 overflow-hidden">
      {/* Left: Bookings list (placeholder) */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Buchungen</h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
            <p className="text-gray-500">
              Diese Seite wird später mit echter Buchungslogik befüllt.
            </p>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Beispiel-Buchungen (Platzhalter):</p>
              <ul className="space-y-2">
                {mockBookings.map((b: MockBooking) => (
                  <li key={b.id}>
                    <Link
                      to={b.id}
                      className="block rounded border border-gray-200 hover:border-gray-300 p-3 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900">{b.title}</div>
                      <div className="text-xs text-gray-500">{b.date}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Nested route renders here */}
      <div className="shrink-0">
        <Outlet />
      </div>
    </div>
  );
}

// Right panel: empty if no booking is selected
export function BookingsIndex() {
  return null;
}

// Right panel: placeholder detail for a selected booking
export function BookingDetailRoute() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-96 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Buchungsdetails (Platzhalter)</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('..')}>
          Zur Übersicht
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-600">
          Hier werden später die Details zur ausgewählten Buchung angezeigt.
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Buchungs-ID:</span>{' '}
          <span className="font-mono text-gray-900">{id}</span>
        </div>
      </div>
    </div>
  );
}
