import { CalendarProvider } from '@/contexts/calendar-context';
import { LocationProvider } from '@/contexts/location-context';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/routes/root-layout';
import { Dashboard, SettingsRoute } from '@/routes/dashboard';
import { BookingsLayout, BookingsIndex, BookingDetailRoute } from '@/routes/bookings';
import { LocationsLayout, LocationsIndex, LocationDetailRoute } from '@/routes/locations';
import './App.css'

function App() {
  return (
    <CalendarProvider>
      <LocationProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="locations" element={<LocationsLayout />}>
              <Route index element={<LocationsIndex />} />
              <Route path=":id" element={<LocationDetailRoute />} />
            </Route>
            <Route path="bookings" element={<BookingsLayout />}>
              <Route index element={<BookingsIndex />} />
              <Route path=":id" element={<BookingDetailRoute />} />
            </Route>
            <Route path="settings" element={<SettingsRoute />} />
          </Route>
        </Routes>
      </LocationProvider>
    </CalendarProvider>
  )
}

export default App
