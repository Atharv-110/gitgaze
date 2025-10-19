"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">
          Please sign in with GitHub to view your board
        </p>
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {session.user?.name}&apos;s GitHub Dashboard
        </h1>
        <button
          onClick={() => signOut()}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
