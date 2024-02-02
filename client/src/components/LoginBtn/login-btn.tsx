import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginBtn() {
  const { data: session } = useSession();

  const clickHandle = () => {
    try {
      if (session) {
        signOut();
      } else {
        signIn("google");
      }
    } catch (error) {
    }
  };
  return (
    <>
      <Button onClick={clickHandle}>{!session ? "Sign in" : "Sign out"}</Button>
      {session?.user?.image && (
        <Image src={session.user.image} alt="avatar" width={100} height={100} />
      )}
    </>
  );
}
