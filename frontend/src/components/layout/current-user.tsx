
import { useCurrentUser } from '@/hooks/use-current-user';

export function CurrentUser() {
  const user = useCurrentUser();

  const initials = `${(user.firstName?.[0] ?? '').toUpperCase()}${(user.lastName?.[0] ?? '').toUpperCase()}`;

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
          aria-label="Aktueller Benutzer Avatar"
        >
          <span className="text-sm font-medium text-white">
            {initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {`${user.firstName} ${user.lastName}`}
          </p>
          <p className="text-xs text-gray-500">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
