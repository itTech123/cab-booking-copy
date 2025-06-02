/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.txigo.com",
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here if you want
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://www.txigo.com/server-sitemap.xml`,
    ],
  },
}