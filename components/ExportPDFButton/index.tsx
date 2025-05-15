"use client";
// 封面详情页面下载PDF按钮组件，主要实现：
// 1. 通过图片UUID查询是否有PDF地址，如果有，直接下载；
// 2. 如果没有，将图片生成PDF，并上传到R2，然后返回PDF的URL；
// 3. 将URL上传到数据库，并返回URL。

import { useState, useContext } from 'react';
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from 'uuid'; // 确保已安装uuid包
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import {  Link as LinkIcon, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExportPDFButtonProps {
  imageUrl: string;
  title: string;
  uuid: string;
}

export default function ExportPDFButton({ imageUrl, title, uuid: coverUuid }: ExportPDFButtonProps) {
  const router = useRouter();
  const { user, fetchUserInfo } = useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndHandlePDF = async () => {
    

    setIsGenerating(true);
    const pdfUuid = uuidv4();
    console.log('开始PDF处理');
    console.log('图片URL:', imageUrl);
    console.log('标题:', title);
    console.log('用于PDF生成的封面UUID:', coverUuid);

    try {
      // 首先，检查是否存在相关的PDF
      const checkResponse = await fetch(`/api/get-pdf?coverUuid=${coverUuid}`);
      const checkData = await checkResponse.json();

      if (checkData.url) {
        console.log('找到现有PDF:', checkData.url);
        // 如果需要，打开现有PDF
        window.open(checkData.url, '_blank');
      } else {
        console.log('未找到现有PDF，正在生成新的PDF');
        // 如果不存在，生成新的PDF
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // 获取A4页面尺寸
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // 设置页面边距
        const margin = 10; // 10毫米边距

        // 计算可用区域
        const availableWidth = pageWidth - (2 * margin);
        const availableHeight = pageHeight - (2 * margin);

        // 获取图片尺寸
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageUrl;
        });

        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgRatio = imgHeight / imgWidth;

        // 计算PDF中的图片大小和位置
        let width, height, x, y;

        if (imgRatio > availableHeight / availableWidth) {
          // 图片高度大于A4，以高度为基准
          height = availableHeight;
          width = height / imgRatio;
          x = margin + (availableWidth - width) / 2;
          y = margin;
        } else {
          // 图片宽度大于A4，以宽度为基准
          width = availableWidth;
          height = width * imgRatio;
          x = margin;
          y = margin + (availableHeight - height) / 2;
        }

        // 添加标题
        doc.setFontSize(16);
        doc.text(title, margin, margin - 2);

        // 添加图片
        doc.addImage(img, 'JPEG', x, y, width, height);

        // 添加水印
        const webBaseUri = process.env.NEXT_PUBLIC_WEB_BASE_URI || 'http://localhost:3000';
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100); // 使用较深的灰色
        doc.text(webBaseUri, pageWidth / 2, pageHeight - margin, { align: 'center' });

        // 生成PDF
        console.log('正在生成PDF');
        const pdfBlob = doc.output('blob');

        // 处理文件名
        const sanitizedTitle = sanitizeFileName(title);
        const mainKeyword = process.env.NEXT_PUBLIC_WEB_MAIN_KEYWORD || '';
        const fileName = `${sanitizedTitle}-${mainKeyword}-${pdfUuid}.pdf`;

        // 创建并打开PDF URL
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');

        console.log('PDF生成完成，已在新标签页中打开');

        // 上传PDF到Cloudflare R2
        console.log('开始上传PDF到Cloudflare R2');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, fileName);
        formData.append('coverUuid', coverUuid);
        formData.append('pdfUuid', pdfUuid);
        formData.append('title', sanitizedTitle);
        
        const response = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'PDF上传失败');
        }

        const { url } = await response.json();
        console.log('PDF上传成功，URL:', url);
      }
    } catch (error) {
      console.error('生成或上传PDF时出错:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 文件名处理函数
  const sanitizeFileName = (name: string): string => {
    // 移除或替换不允许的字符
    let sanitized = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '');
    // 将空格替换为下划线
    sanitized = sanitized.replace(/\s+/g, '_');
    // 限制文件名长度
    sanitized = sanitized.slice(0, 200);
    // 确保文件名不为空
    return sanitized || 'untitled';
  };

  return (
    <Button
      variant="outline"
      onClick={generateAndHandlePDF}
      disabled={isGenerating}
      className="w-full justify-start gap-2"
    >
      <Printer className="w-4 h-4" />
      {isGenerating ? 'Opening PDF...' : 'Download PDF'}
    </Button>
  );
}

