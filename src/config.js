const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title: 'Maquarie Health Chiropractor',
      description: 'Maquarie Health Chiropractor',
      head: {
        titleTemplate: '%s | Maquarie Health Chiropractor',
        meta: [
          { name: 'description', content: 'Maquarie Health Chiropractor' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'Maquarie Health Chiropractor' },
          {
            property: 'og:image',
            content: ''
          },
          { property: 'og:locale', content: 'en_AU' },
          { property: 'og:title', content: 'Maquarie Health Chiropractor' },
          {
            property: 'og:description',
            content: 'Maquarie Health Chiropractor'
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@' },
          { property: 'og:creator', content: '@' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
          { property: 'robots', content: 'INDEX, FOLLOW' },
          {
            property: 'google-site-verification',
            content: 'OaySxtYDdqGFmLgV137w-6OpTOp4k1TbRS5HJ6KCG7k'
          }
        ]
        /* , link: [
          { rel: 'canonical', content: '/' },
          { rel: 'publisher', content: 'https://plus.google.com/112055120681563804751' }
        ] */
      }
    }
  },
  environment
);
