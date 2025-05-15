"use client";
{/* 
这是一个多输入表单组件，用于创建或编辑涂色页面
主要功能:
1. 提供多个输入字段，包括文本输入、下拉选择等
2. 处理用户输入和表单提交
3. 与后端API交互，创建或更新涂色页面
4. 支持只读模式，用于展示已有数据
5. 根据props动态显示或隐藏某些输入字段
6. 使用上下文管理全局状态，如用户信息和涂色页面列表
*/}
import { KeyboardEvent, useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

interface MultiInputFormProps {
  // 移除必需的分类属性
  initialCategory?: string;  // 改为可选
  categoryId?: number;       // 改为可选
  showCategoryInput?: boolean;
  readOnly?: boolean;
}

export function MultiInputForm({ 
  initialCategory,  // 保留但为可选
  categoryId,       // 保留但为可选
  showCategoryInput = false, 
  readOnly = false 
}: MultiInputFormProps) {
  const router = useRouter();
  const { setCovers, user, fetchUserInfo } = useContext(AppContext);
  const [dropdown1, setDropdown1] = useState(initialCategory || ""); // 使用空字符串作为默认值
  const [dropdown2, setDropdown2] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Define state to store tags within the component
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]); // Modified state to store tag IDs

  // Fetch tags in useEffect
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setTags(data); // Assuming the returned data is an array of tags with id and name
        if (data.length > 0) {
          setDropdown2(data[0].name);
          setSelectedTagId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };

    fetchTags();
  }, []);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const getCombinedDescription = () => {
    // Process dropdown1 input
    const processedDropdown1 = dropdown1
      .replace(/[^\w\s]|_/g, " ") // Replace all non-word characters with spaces
      .trim() // Remove leading and trailing spaces
      .replace(/\s+/g, " "); // Replace consecutive spaces with a single space

    return `${dropdown1} ${processedDropdown1} ${dropdown2}`.trim();
  };

  const handleSubmit = async () => {
    const description = getCombinedDescription();
    console.log("description", description);
    if (!description) {
      toast.error("Please enter a description");
      inputRef.current?.focus();
      return;
    }

    // The rest of the submission logic remains unchanged
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
      const response = await fetch("/api/gen-cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: getCombinedDescription(),
          categoryId: selectedTagId, // Add categoryId to the request body
          tagId: selectedTagId, // Add tagId to the request body
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      // Refresh the page after successful generation
      router.refresh();

      const { code, message, data } = await response.json();
      setLoading(false);

      if (response.status === 401) {
        toast.error("Please log in first");
        router.push("/sign-in");
        return;
      }

      if (code !== 0) {
        toast.error(message);
        return;
      }

      fetchUserInfo();
      setDropdown1("");
      setDropdown2(tags[0]?.name || "");
      setSelectedTagId(tags[0]?.id || null);

      toast.success("Generation successful");
      if (data) {
        console.log("new cover", data);
        setCovers((prevCovers: Cover[] | undefined) => {
          if (Array.isArray(prevCovers)) {
            return [data, ...prevCovers];
          } else {
            return [data];
          }
        });
        triggerFireworks();
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to generate image, please try again');
    }
  };

  const [selectedTagId, setSelectedTagId] = useState<number | null>(null); // New state to store the ID of the selected tag

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg border-4 border-dashed border-blue-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Your AI Illustrations</h2>
      
      <div className="space-y-4">
        {showCategoryInput && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Random Category</label>
            <input
              type="text"
              id="category"
              className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${readOnly ? 'bg-gray-100' : ''}`}
              value={dropdown1}
              onChange={(e) => !readOnly && setDropdown1(e.target.value)}
              placeholder="Category name"
              readOnly={readOnly} // Set readonly attribute
            />
          </div>
        )}
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe your creative scene</label>
          <textarea
            id="description"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter your creative idea, e.g., forest, flowers, ocean, castle, house, lounge chair on the beach"
            ref={inputRef}
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
            onKeyDown={handleInputKeydown}
            rows={4}
          />
        </div>
        
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">Choose a style</label>
          <select
            id="style"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={dropdown2}
            onChange={(e) => {
              const selectedTag = tags.find(tag => tag.name === e.target.value);
              setDropdown2(e.target.value);
              setSelectedTagId(selectedTag ? selectedTag.id : null);
            }}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
        
        <button
          className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        After clicking generate, you can download your unique AI illustrations!
      </p>
    </div>
  );
}

export default MultiInputForm;
