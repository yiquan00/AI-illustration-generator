/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://illustration.imglab.dev',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*', '/_next/*', '/static/*'],
  // 只包含重要静态页面
  additionalPaths: async () => {
    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/explore',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/gallery',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/pricing',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/privacy-policy',
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      }
    ];
  },
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/static/*', '/admin/*', '/private/*'],
      },
      {
        userAgent: ['GPTBot', 'Claude-Web', 'Anthropic-AI', 'PerplexityBot', 'GoogleOther', 'DuckAssistBot'],
        allow: [
          '/',
          '/explore',
          '/gallery',
          '/pricing',
          '/privacy-policy',
          '/llms.txt',
          '/llms-full.txt'
        ],
        disallow: ['/api/*', '/_next/*', '/static/*', '/admin/*', '/private/*', '/user-content/*'],
      }
    ],
  },
};

