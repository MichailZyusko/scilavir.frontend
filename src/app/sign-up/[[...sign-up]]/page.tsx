import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export default function SignUpPage() {
  return (
    <main className="flex flex-auto justify-center mb-10">
      <SignUp />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Зарегестрироваться',
};
