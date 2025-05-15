# Notion 风格插画生成器

## 项目概述

一款开源的AI插画生成网站，基于 Next.js 和 TypeScript 构建。该项目源于对 Notion 风格插画的喜爱，但市场上缺乏此类资源的现状。系统提供了直观的用户界面，让用户能够轻松创建符合 Notion 美学的扁平化插画。

## 主要功能

1. **Notion 风格插画生成**：专门训练的 AI 模型，生成符合 Notion 美学的扁平化插画
2. **用户管理**：使用 Clerk 提供的注册、登录和个人信息管理功能
3. **积分系统**：用户可以购买积分来生成图像，支持多种套餐选择
4. **支付集成**：集成 Stripe 支付功能，支持一次性支付和订阅模式
5. **社交分享**：用户可以在社交媒体上分享生成的作品，并通过分享获得额外的免费积分
6. **图库展示**：展示用户生成的作品，支持分类浏览和搜索
7. **响应式设计**：完美适配桌面和移动设备的用户界面
8. **数据存储**：使用 Cloudflare R2 存储用户生成的图片，并使用 PostgreSQL 进行数据管理
9. **分类管理、标签页**： 功能已完成，未放出， 可参考 [colorfun.cc](https://colorfun.cc)
10. **数据统计**：使用 Google Analytics 和 Microsoft Clarity 进行数据统计和优化

## 技术栈

### 当前使用
- **前端框架**：Next.js 14（使用 App Router）
- **编程语言**：TypeScript
- **数据库**：PostgreSQL（使用 pg 库进行连接）
- **样式**：Tailwind CSS 和自定义组件
- **状态管理**：React Context API 和 Hooks
- **身份验证**：Clerk
- **支付集成**：Stripe
- **图片存储**：Cloudflare R2
- **AI 模型集成**：Replicate API  / Gemini / deepseek 
- **分析工具**：Google Analytics 和 Microsoft Clarity
- **UI 组件**：自定义组件和 shadcn/ui 风格组件
- **动画效果**：CSS 动画和过渡效果
- **响应式设计**：适配各种屏幕尺寸的布局


#### 技术优化
- **性能优化**：改进图像加载速度和页面渲染性能，见[PageSpeed Insights](https://pagespeed.web.dev/analysis/https-illustration-imglab-dev/kcvh5cvbi5?form_factor=desktop)
- **SEO 增强**：完善结构化数据和站点地图
- **API 缓存**：优化 API 调用，减少重复请求

## 特色亮点

- **专注于 Notion 风格**：与其他通用 AI 图像生成器不同，我们专注于创建符合 Notion 美学的扁平化插画
- **简洁直观的界面**：遵循 Notion 的设计理念，提供简洁、直观的用户界面
- **社交分享激励**：通过社交媒体分享获得额外免费积分的创新机制
- **响应式设计**：无论在桌面还是移动设备上都能提供出色的用户体验
- **高质量输出**：经过专门训练的 AI 模型，确保生成的插画符合 Notion 风格的高标准

## 致谢

本项目参考了以下开源项目和资源:

- [aicover](https://github.com/all-in-aigc/aicover) - 提供了 AI 图片生成的灵感和参考
- [shadcn-landing-page](https://github.com/nobruf/shadcn-landing-page) - 提供了现代化 UI 设计的参考
- [shadcn/ui](https://ui.shadcn.com/) - 提供了高质量 UI 组件的设计灵感

## 社区与支持

- **反馈与建议**：如果您有任何反馈或建议，请发送邮件至 support@imglab.dev
- **社交媒体**：关注我们的 Twitter 账号获取最新更新
- **分享奖励**：在社交媒体上分享您的作品并发送链接至 support@imglab.dev，获取免费生成额度

## 联系方式

项目维护者：Eson.yan  
邮箱：support@imglab.dev
