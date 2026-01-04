// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kenzy.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 1, // ← Force SINGLE sitemap (no splitting)
  // Optional: Manually add pages if auto-detection fails
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/developer'),
    // Add other pages if you have them
    // await config.transform(config, '/projects'),
  ],
};