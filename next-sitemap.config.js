// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 1. Updated to your verified production domain
  siteUrl: 'https://kanatnazarov.com',
  
  // 2. Automatically generate the clean robots.txt file we just configured
  generateRobotsTxt: true,
  
  // 3. Keep it all cleanly in one file (no sitemap-0.xml splits)
  sitemapSize: 5000, 

  // 4. Force trailing slashes or pathing behaviors to match Next.js routes
  trailingSlash: false,

  // 5. Explicit route mapping
  additionalPaths: async (config) => [
    // This maps your primary resume-style bio experience canvas
    await config.transform(config, '/developer'),
    // This maps your engineering blog home stream hub
    await config.transform(config, '/blog'),
  ],
};