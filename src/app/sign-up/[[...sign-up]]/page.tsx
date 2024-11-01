import { SignUp } from '@clerk/clerk-react';
import { Metadata } from 'next';

export default function SignUpPage() {
  return (
    <main className="flex flex-auto justify-center">
      <SignUp />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Зарегестрироваться',
};
