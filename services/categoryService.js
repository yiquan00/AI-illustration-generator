// 导入所需的函数和类型
const { findCoverByUuid } = require('../models/cover');
const { getDb } = require('../models/db');
const { 
  getAllCategories, 
  getCategoryWithAncestors: getCategoryWithAncestorsModel,
  getCategoryBySlug: getCategoryBySlugModel, 
  getCoversByCategorySlug: getCoversByCategorySlugModel 
} = require('@/models/category');

// 获取父级分类树（只包含顶级分类）
async function getParentCategoryTree() {
  try {
    const categories = await getAllCategories();
    // 只过滤出顶级分类（parentId 为 null 的分类）
    const parentCategories = categories.filter(category => category.parentId === null);
    
    return parentCategories.map(category => ({
      id: category.id,
      name: category.name,
      level: category.level,
      previewImage: category.previewImage,
      childrenCount: categories.filter(c => c.parentId === category.id).length // 添加子分类数量
    }));
  } catch (error) {
    console.error('获取父级分类失败:', error);
    throw new Error(`获取父级分类时发生错误: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

// 获取扁平化的分类列表（用于下拉菜单等场景）
async function getFlatCategoryList() {
  try {
    const categories = await getAllCategories();
    return categories.map(category => ({
      id: category.id,
      name: '  '.repeat(category.level) + category.name, // Add indentation to represent hierarchy
      level: category.level
    })).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, 'zh-CN'));
  } catch (error) {
    console.error('Failed to get flat category list:', error);
    throw new Error('An error occurred while getting the category list');
  }
}

// 通过id获取cover列表数据
async function getCoversByCategoryId(categoryId, page = 1, limit = 50) {
  return await getCoversByCategoryIdModel(categoryId, page, limit);
}

// 通过分类ID找到上级分类
async function getCoverCategoryPath(categoryId) {
  try {
    const categories = await getCategoryWithAncestorsModel(categoryId);
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      level: category.level,
      children: []
    }));
  } catch (error) {
    console.error('Failed to get image category path:', error);
    throw new Error(`An error occurred while getting the image category path: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// 获取子分类
async function getChildCategories(categoryId) {
  try {
    const categories = await getAllCategories();
    const childCategories = categories.filter(category => category.parentId === categoryId);
    return childCategories.map(category => ({
      id: category.id,
      name: category.name,
      level: category.level,
      children: [],
      previewImage: category.previewImage
    }));
  } catch (error) {
    console.error('Failed to get child categories:', error);
    throw new Error(`An error occurred while getting child categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getCategoryBySlug(slug) {
  return await getCategoryBySlugModel(slug);
}

async function getCoversByCategorySlug(slug) {
  return await getCoversByCategorySlugModel(slug);
}

// 获取完整的分类树
async function getCategoryTree() {
  try {
    const categories = await getAllCategories();
    return buildCategoryTree(categories);
  } catch (error) {
    console.error('Failed to get category tree:', error);
    throw new Error(`An error occurred while getting the category tree: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// 构建分类树的辅助函数
function buildCategoryTree(categories) {
  const categoryMap = new Map();
  const rootCategories = [];

  // 创建所有节点
  categories.forEach(category => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      level: category.level,
      previewImage: category.previewImage,
      children: []
    });
  });

  // 构建树结构
  categories.forEach(category => {
    const node = categoryMap.get(category.id);
    if (category.parentId === null) {
      rootCategories.push(node);
    } else {
      const parentNode = categoryMap.get(category.parentId);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });

  // 递归对子分类进行排序
  const sortChildren = (node) => {
    node.children.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    node.children.forEach(sortChildren);
  };

  // 对根分类进行排序
  rootCategories.forEach(sortChildren);
  rootCategories.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

  return rootCategories;
}

// 导出函数
module.exports = {
  getParentCategoryTree,
  getFlatCategoryList,
  getCoversByCategoryId,
  getCoverCategoryPath,
  getChildCategories,
  getCategoryBySlug,
  getCoversByCategorySlug,
  getCategoryTree
};
