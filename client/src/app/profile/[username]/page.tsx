"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page({ params }: { params: { username: string } }) {
  const router = useRouter();

  useEffect(() => {
    if (params && params.username) {
      router.push(`/${params.username}/info`);
    }
  }, [params, router]);

  return <div>Redirecting...</div>;
}