/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession, signIn, signOut } from "next-auth/react";

function signin() {
  const { data: session }: any = useSession();

  if (session) {
    return (
      <>
        <div>You are logged in</div>
        <button onClick={() => signOut()}>Sign Out!</button>
      </>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Sign in!</button>
    </div>
  );
}

export default signin;
