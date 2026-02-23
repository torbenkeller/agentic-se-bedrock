import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { MainNavigation, CurrentUser } from '@/components/layout';




export function RootLayout() {


  return (
    <div className="h-screen w-screen flex bg-gray-50 overflow-hidden">
      <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Calvin</h1>
          <p className="text-sm text-gray-500 mt-1">Arbeitsplatz-Buchung</p>
        </div>
        <MainNavigation />
        <Suspense
          fallback={
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          }
        >
          <CurrentUser />
        </Suspense>
      </div>

      {/* Main content routed via Outlet */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </div>


    </div>
  );
}
