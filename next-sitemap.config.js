/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://pradhumnmishra.online",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/404", "/500", "/robots.txt"],
};