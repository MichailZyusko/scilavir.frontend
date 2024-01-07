import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export default function SignInPage() {
  return (
    <main className="flex flex-auto justify-center">
      <SignIn />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Войти',
};
