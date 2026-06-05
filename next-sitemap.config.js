/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 1. Главный подтвержденный продакшн-домен
  siteUrl: 'https://kanatnazarov.com',
  
  // 2. Принудительная генерация чистого robots.txt
  generateRobotsTxt: true,
  
  // 3. Удерживаем все пути в одном файле без деления на sitemap-0.xml
  sitemapSize: 5000, 

  // 4. Соответствие роутингу Next.js (без слэша на конце)
  trailingSlash: false,

  // 5. Исключаем базовые пути без локалей, чтобы Google не хватал пустые Vercel-шаблоны
  exclude: ['/developer', '/blog', '/lifestyle'],

  // 6. Семантическая склейка языковых версий для поисковых пауков
  alternateRefs: [
    {
      href: 'https://kanatnazarov.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://kanatnazarov.com/ru',
      hreflang: 'ru',
    },
  ],

  // 7. 🔥 ИСПРАВЛЕНО: Явное дерево путей без роута /developer
  additionalPaths: async (config) => {
    const paths = [
      // Локализованные корни (твоя новая главная страница)
      '/en',
      '/ru',
      
      // Твои контентные хабы-журналы
      '/en/blog',
      '/en/lifestyle',
      '/ru/blog',
      '/ru/lifestyle'
    ];

    return Promise.all(
      paths.map((path) => config.transform(config, path))
    );
  },

  // 8. Жесткие инструкции для индексации
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};