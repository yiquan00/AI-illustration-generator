{/* 
这是一个分类树组件
它从服务器获取分类数据并以树状结构展示
主要功能:
1. 显示所有分类及其子分类
2. 为每个分类提供链接，点击可导航到相应的分类页面
3. 使用网格布局来组织顶级分类
4. 子分类以列表形式显示在父分类下方

组件结构:
- AllCategories: 主组件，负责获取数据并渲染整体结构
- CategoryItem: 子组件，负责渲染单个分类项及其子分类

注意事项:
- 使用了服务端组件，因此可以直接在组件中进行异步数据获取
- 链接使用了URL友好的格式，
- 使用了响应式网格布局，以适应不同屏幕尺寸
*/}

import Link from 'next/link';
import { getParentCategoryTree } from '@/services/categoryService';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface CategoryTreeNode {
  id: number;
  name: string;
  level: number;
  previewImage: string | null;
  childrenCount: number;
  children?: CategoryTreeNode[];
}

function CategoryItem({ category }: { category: CategoryTreeNode }) {
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <Link
        key={category.id}
        href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
        className={cn(
          "block p-2 hover:bg-accent rounded-md transition-colors",
          pathname === `/categories/${category.name.toLowerCase()}` && "bg-accent"
        )}
      >
        {category.name}
      </Link>
      {category.children && category.children.length > 0 && (
        <div className="pl-4">
          {category.children.map(child => (
            <Link
              key={child.id}
              href={`/categories/${encodeURIComponent(child.name.toLowerCase())}`}
              className={cn(
                "block p-2 hover:bg-accent rounded-md transition-colors",
                pathname === `/categories/${child.name.toLowerCase()}` && "bg-accent"
              )}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AllCategories() {
  try {
    const categories = await getParentCategoryTree();

    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">More Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <div className="text-center mt-8">Error loading categories. Please try again later.</div>;
  }
}
