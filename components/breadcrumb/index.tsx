{/* 
这是一个面包屑导航组件
它接受一个包含分类信息的数组作为props
每个分类项包含id、name和level属性
组件会根据这些分类信息生成一个导航路径
从首页开始，依次显示每个分类的链接
最后一个分类项会显示为当前页面，不可点击
这个组件使用了shadcn的UI组件来创建面包屑样式
*/}

import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CategoryTreeNode {
  id: number;
  name: string;
  level: number;
}

interface BreadcrumbProps {
  categories: CategoryTreeNode[];
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                  className="text-sm font-medium hover:text-primary"
                >
                  {category.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < categories.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
