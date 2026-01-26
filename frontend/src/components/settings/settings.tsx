import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from '@/hooks/use-location';
import { cn } from '@/lib/utils';

export function Settings() {
  const { locations } = useLocation();

  // Get current default location from localStorage
  const getDefaultLocation = () => {
    const defaultLocationId = localStorage.getItem('defaultLocation');
    return defaultLocationId ? locations.find(loc => loc.id === defaultLocationId) : null;
  };

  const defaultLocation = getDefaultLocation();

  const handleSetDefaultLocation = (locationId: string) => {
    localStorage.setItem('defaultLocation', locationId);
    // Force component re-render
    window.dispatchEvent(new Event('storage'));
  };

  const handleClearDefaultLocation = () => {
    localStorage.removeItem('defaultLocation');
    window.dispatchEvent(new Event('storage'));
  };

  // Get country flag emoji
  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'Schweiz':
        return '🇨🇭';
      case 'Deutschland':
        return '🇩🇪';
      default:
        return '🏢';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Einstellungen</h2>
      
      <div className="space-y-6">
        {/* Default Location Setting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Standard-Standort
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Wähle deinen bevorzugten Standort aus. Dieser wird bei der Standortauswahl priorisiert angezeigt und hilft dir dabei, schneller zu deinem häufig genutzten Büro zu gelangen.
            </p>
            
            {defaultLocation && (
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCountryFlag(defaultLocation.address.country)}</span>
                  <div>
                    <p className="font-medium text-gray-900">{defaultLocation.name}</p>
                    <p className="text-sm text-gray-500">
                      {defaultLocation.type === 'headquarters' ? 'Hauptstandort' : 'Zweigstelle'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearDefaultLocation}
                >
                  Entfernen
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {locations.map((location) => {
                const isDefault = defaultLocation?.id === location.id;
                return (
                  <div
                    key={location.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                      isDefault 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => handleSetDefaultLocation(location.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getCountryFlag(location.address.country)}</span>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{location.name}</p>
                          <p className="text-xs text-gray-500">
                            {location.type === 'headquarters' ? 'Hauptstandort' : 'Zweigstelle'}
                          </p>
                        </div>
                      </div>
                      {isDefault && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Future Settings Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Weitere Einstellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Weitere Einstellungsmöglichkeiten werden hier hinzugefügt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}