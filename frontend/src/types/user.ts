/**
 * User types for the current authenticated user.
 * This is intended to be used by the `useCurrentUser` hook and related UI.
 */

export interface User {
  /**
   * Globally unique username (e.g., login/handle)
   */
  username: string;

  /**
   * Vorname des Benutzers
   */
  firstName: string;

  /**
   * Nachname des Benutzers
   */
  lastName: string;

  /**
   * E-Mail-Adresse des Benutzers
   */
  email: string;
}

/**
 * Alias for the user representing the currently authenticated identity.
 */
export type CurrentUser = User;