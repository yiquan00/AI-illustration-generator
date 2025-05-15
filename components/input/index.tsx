"use client";
{/* 
这是一个输入组件，用于接收用户的描述并生成涂色页面
主要功能:
1. 提供输入框让用户输入描述
2. 处理用户的回车键事件
3. 验证用户输入和登录状态
4. 检查用户剩余积分
5. 提交描述到服务器生成涂色页面
*/}


import { KeyboardEvent, useContext, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface InputProps {
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  onGenerate?: (cover: Cover) => void;
}

export default function Input({ 
  className = "relative max-w-2xl mx-auto mt-4 md:mt-16",
  buttonClassName = "relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-primary border-primary px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto",
  inputClassName = "mb-1 h-9 w-full rounded-md border border-solid border-primary px-3 py-6 text-sm text-[#333333] focus:border-primary",
  onGenerate
}: InputProps) {
  const router = useRouter();
  const { setCovers, user, fetchUserInfo } = useContext(AppContext);
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    console.log("description", description);
    if (!description) {
      toast.error("Please enter a description");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      toast.error("Please log in first");
      router.push("/sign-in");
      return;
    }

    if (user.credits && user.credits.left_credits < 1) {
      toast.error("Insufficient balance, please recharge first");
      router.push("/pricing");
      return;
    }

    try {
      const params = {
        description: description,
      };

      setLoading(true);
      const resp = await fetch("/api/gen-cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { code, message, data } = await resp.json();
      setLoading(false);

      if (resp.status === 401) {
        toast.error("Please log in first");
        router.push("/sign-in");
        return;
      }
      console.log("gen wallpaper resp", resp);

      if (code !== 0) {
        toast.error(message);
        return;
      }

      fetchUserInfo();
      setDiscription("");

      toast.success("Generated successfully");
      if (data) {
        console.log("new cover", data);
        setCovers((covers: Cover[]) => [data, ...covers]);
        onGenerate?.(data);
      }
    } catch (e) {
      console.log("gen cover failed", e);
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        className={inputClassName}
        placeholder="Enter description"
        ref={inputRef}
        value={description}
        onChange={(e) => setDiscription(e.target.value)}
        onKeyDown={handleInputKeydown}
      />
      {loading ? (
        <button
          className={buttonClassName}
          disabled
        >
          生成中...
        </button>
      ) : (
        <button
          className={buttonClassName}
          onClick={handleSubmit}
        >
          生成图片
        </button>
      )}
    </div>
  );
}
