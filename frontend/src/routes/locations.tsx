import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LocationList } from '@/components/location';
import { LocationDetail } from '@/components/location/location-detail';
import { useParams } from 'react-router-dom';

/**
 * LocationsLayout renders the locations list on the left and an Outlet on the right.
 * The Outlet will render nested routes (e.g., the LocationDetail) side-by-side.
 */
export function LocationsLayout() {
  console.log(useParams());
  return (
    <div className="h-full w-full flex bg-gray-50 overflow-hidden">
      {/* Left: Locations list */}
      <div className="flex-1 overflow-auto">
        <LocationList />
      </div>

      {/* Right: Nested route (detail panel) */}
      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
              <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 shadow-sm">
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="p-4 space-y-3">
                <div className="h-24 bg-gray-100 animate-pulse rounded" />
                <div className="h-24 bg-gray-100 animate-pulse rounded" />
                <div className="h-24 bg-gray-100 animate-pulse rounded" />
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * LocationsIndex is rendered when on /locations without an :id.
 * It intentionally renders nothing on the right panel.
 * You can replace this with a friendly placeholder if desired.
 */
export function LocationsIndex() {
  return null;
}

/**
 * LocationDetailRoute renders the detail component on the right side.
 * It relies on the route param (:id) and React Query to fetch on render.
 */
export function LocationDetailRoute() {
  return <LocationDetail />;
}
