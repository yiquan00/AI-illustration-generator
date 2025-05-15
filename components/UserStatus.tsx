"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function UserStatus() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("👤 UserStatus - 组件挂载");
    console.log("👤 UserStatus - 加载状态:", isLoaded);
    console.log("👤 UserStatus - 用户信息:", {
      userId: user?.id,
      email: user?.emailAddresses?.[0]?.emailAddress,
      firstName: user?.firstName
    });

    if (isLoaded) {
      console.log("👤 UserStatus - 触发页面刷新");
      router.refresh();
    }
  }, [isLoaded, user, router]);

  return null;
} 