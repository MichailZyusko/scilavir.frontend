import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex flex-auto justify-center">
      <SignUp />
    </main>
  );
}
