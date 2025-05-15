"use client";
import { KeyboardEvent, useContext, useRef, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { ResultModal } from "@/components/ui/result-modal";
import { TypingEffect } from "@/components/ui/typing-effect";

interface TextPromptProps {
  className?: string;
  onGenerate?: (cover: Cover) => void;
}

export default function TextPrompt({
  className = "max-w-2xl mx-auto mt-4 md:mt-8",
  onGenerate
}: TextPromptProps) {
  const router = useRouter();
  const { setCovers, user, fetchUserInfo } = useContext(AppContext);
  const [description, setDescription] = useState("");

  // Example prompts for the typing effect
  const examplePrompts = [
    "A girl reading a book under a tree",
    "A girl walks by the river, melancholic",
    "A cat sleeping on a windowsill",
    "A cozy coffee shop on a rainy day",
    "A mountain landscape at sunset"
  ];
  const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [showOptimizeArea, setShowOptimizeArea] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [showResultModal, setShowResultModal] = useState(false);
  const [generatedCover, setGeneratedCover] = useState<Cover | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleOptimize = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description");
      textareaRef.current?.focus();
      return;
    }

    try {
      setOptimizing(true);
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description })
      });

      const { result } = await resp.json();
      if (result) {
        setOptimizedPrompt(result);
        setShowOptimizeArea(true);
        toast.success("Prompt optimized successfully");
      } else {
        toast.error("Failed to optimize prompt");
      }
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      toast.error("Failed to optimize prompt, please try again");
    } finally {
      setOptimizing(false);
    }
  };

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (!description.trim()) {
        toast.error("Please enter a description");
        textareaRef.current?.focus();
        return;
      }

      if (!user) {
        toast.error("Please sign in first");
        router.push("/sign-in");
        return;
      }

      if (user.credits && user.credits.left_credits < 1) {
        toast.error("Insufficient credits, please recharge");
        router.push("/pricing");
        return;
      }

      setLoading(true);
      const resp = await fetch("/api/gen-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: optimizedPrompt || description,
          originalDescription: description,
        }),
      });

      const responseData = await resp.json();

      if (resp.status === 401) {
        toast.error("Please sign in first");
        router.push("/sign-in");
        return;
      }

      if (responseData.code !== 0) {
        toast.error(responseData.message);
        return;
      }

      fetchUserInfo();
      toast.success("Generated successfully");

      if (responseData.data) {
        setCovers((prevCovers: Cover[] | null) => {
          if (prevCovers === null) {
            return [responseData.data];
          }
          return [responseData.data, ...prevCovers];
        });

        setGeneratedCover(responseData.data);
        setShowResultModal(true);

        if (onGenerate) {
          onGenerate(responseData.data);
        }
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Generation failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 移除 Card 的默认边框，添加阴影 */}
      <Card className={`${className} creative-card`}>

        <CardContent className="space-y-8 p-8 pt-8">
          {/* 区域 A：输入框 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-neutral-800 flex items-center">
                <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center mr-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="var(--neutral-800)"/>
                  </svg>
                </div>
                Describe your creativity

              </div>

              {/* 创新优化按钮 */}
              <Button
                onClick={handleOptimize}
                disabled={optimizing || loading || !description.trim()}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-neutral-200 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all duration-200"
                title="Optimize Prompt"
              >
                {optimizing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* 创新输入框 */}
            <div className="relative group">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (optimizedPrompt) {
                      setOptimizedPrompt(null);
                      setShowOptimizeArea(false);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={loading || optimizing}
                  placeholder=""
                  className="creative-input min-h-[150px] resize-y pr-10 text-base pt-8"
                />
                <div className="absolute top-3 left-3 text-neutral-500 text-sm pointer-events-none">
                  {description.length === 0 && !loading && !optimizing && (
                    <div className="flex items-center">
                      <span className="mr-1">Try:</span>
                      <TypingEffect
                        phrases={examplePrompts}
                        typingSpeed={80}
                        deletingSpeed={40}
                        delayBetweenPhrases={2000}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 字数计数器 */}
              <div className="absolute bottom-2 right-2 text-xs text-neutral-400 group-focus-within:text-primary-dark transition-colors duration-200">
                {description.length} / 280
              </div>
            </div>
          </div>

          {/* 创新优化提示区域 */}
          {showOptimizeArea && (
            <div className="rounded-xl bg-gradient-to-r from-neutral-200 to-neutral-100 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-sm font-bold text-neutral-800 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="currentColor"/>
                  </svg>
                  Enhanced Prompt
                </h3>
                <p className="text-sm text-neutral-800 whitespace-pre-wrap">{optimizedPrompt}</p>
              </div>
            </div>
          )}
        </CardContent>

        {/* 移除 CardFooter 的顶部边框 */}
        <CardFooter className="flex justify-between items-center p-8 pt-0">
          {/* 创新提示标签 */}
          <div className="text-xs text-neutral-500">
            Press Enter to generate
          </div>

          {/* 创新生成按钮 */}
          <Button
            onClick={handleSubmit}
            disabled={loading || optimizing || !description.trim()}
            size="lg"
            className="creative-button px-8"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 relative mr-2">
                  <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                Creating...
              </div>
            ) : (
              <div className="flex items-center">
                <span>Generate</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="currentColor"/>
                </svg>
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        cover={generatedCover}
        title={description}
      />
    </>
  );
}