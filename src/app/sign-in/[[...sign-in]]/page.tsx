import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex flex-auto justify-center">
      <SignIn />
    </main>
  );
}
