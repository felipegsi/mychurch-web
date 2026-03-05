/**
 * O que é este ficheiro:
 * - Contratos de tipagem do domínio de usuário.
 *
 * O que deve ir dentro:
 * - Interfaces e type aliases relacionados a User e AuthUser.
 *
 * O que NÃO deve ir dentro:
 * - Estado global (Zustand), componentes React ou requests HTTP.
 *
 * Como interage com outros ficheiros:
 * - features/auth/types.ts reutiliza User.
 * - features/auth/store.ts usa AuthUser para manter sessão.
 */
export type UserRole = 'ADMIN' | 'PASTOR' | 'LEADER' | 'MEMBER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  churchId: string;
}

export interface AuthUser extends User {
  lastLoginAt?: string;
}
