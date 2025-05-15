"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  currentPhraseIndex?: number;
  onPhraseChanged?: (index: number) => void;
}

export function TypingEffect({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1500,
  className = "",
  currentPhraseIndex: externalIndex,
  onPhraseChanged
}: TypingEffectProps) {
  const [internalPhraseIndex, setInternalPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 使用外部索引（如果提供）或内部索引
  const currentPhraseIndex = externalIndex !== undefined ? externalIndex : internalPhraseIndex;

  useEffect(() => {
    // Clear any existing timeout when component unmounts
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 当外部索引变化时，重置打字状态
  useEffect(() => {
    if (externalIndex !== undefined) {
      setCurrentText("");
      setIsDeleting(false);
      setIsBlinking(false);
    }
  }, [externalIndex]);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);

        // 如果使用内部索引，则自动切换到下一个短语
        if (externalIndex === undefined) {
          const nextIndex = (internalPhraseIndex + 1) % phrases.length;
          setInternalPhraseIndex(nextIndex);

          // 如果提供了回调函数，则通知外部组件短语已更改
          if (onPhraseChanged) {
            onPhraseChanged(nextIndex);
          }
        }

        timeoutRef.current = setTimeout(() => {
          setIsBlinking(false);
        }, delayBetweenPhrases);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, deletingSpeed);
    } else {
      if (currentText === currentPhrase) {
        setIsBlinking(true);
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          setIsBlinking(false);
        }, delayBetweenPhrases);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      }, typingSpeed);
    }
  }, [currentText, currentPhraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <AnimatePresence>
        {isBlinking && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="ml-0.5 inline-block w-0.5 h-5 bg-primary-dark"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
