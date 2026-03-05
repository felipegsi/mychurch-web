import { redirect } from 'next/navigation';

/**
 * Página raiz redirecionando para entrada pública.
 */
export default function RootPage() {
  redirect('/login');
}