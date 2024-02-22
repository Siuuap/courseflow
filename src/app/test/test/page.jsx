"use client";
import { useSession, signOut } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, update } = useSession();
  const router = useRouter();

  async function handleUpdate() {
    await update({
      ...session,
      user: {
        ...session?.user,
        firstName: "AII",
      },
    });
    router.refresh();

    console.log(session);
  }

  return (
    <>
      <NavBar />
      <button
        onClick={() => {
          handleUpdate();
        }}
        className="  bg-slate-300"
      >
        update
      </button>
    </>
  );
}
