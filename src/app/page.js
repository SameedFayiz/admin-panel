"use client";
import SignIn from "@/components/signIn";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/authContext";

export default function Home() {
  const [user] = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("dashBoard");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn></SignIn>
    </main>
  );
}
