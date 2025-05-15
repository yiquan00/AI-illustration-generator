// 为了生成sitemap，创建了这个文件
const path = require('path');
const tsconfig = require('../tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

// 注册 ts-node
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

// 注册 tsconfig-paths
const baseUrl = path.join(process.cwd(), tsconfig.compilerOptions.baseUrl || '.');
tsConfigPaths.register({
  baseUrl,
  paths: tsconfig.compilerOptions.paths,
});

const categoryServicePath = path.resolve(__dirname, '../services/categoryService.ts');
const { getCategoryTree } = require(categoryServicePath);

module.exports = {
  getCategoryTree,
};
