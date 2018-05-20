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
      title: 'Maquarie Health Professionals',
      description: 'Maquarie Health Professionals',
      head: {
        titleTemplate: '%s | Maquarie Health Professionals',
        meta: [
          { name: 'description', content: 'Maquarie Health Professionals' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'Maquarie Health Professionals' },
          {
            property: 'og:image',
            content: ''
          },
          { property: 'og:locale', content: 'en_AU' },
          { property: 'og:title', content: 'Maquarie Health Professionals' },
          {
            property: 'og:description',
            content: 'Maquarie Health Professionals'
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@' },
          { property: 'og:creator', content: '@' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
          { property: 'robots', content: 'INDEX, FOLLOW' },
          {
            property: 'google-site-verification',
            content: 'bGzKWfvL3vyQct3IIPbCoOz__jr5vjS41_NKsKS1hkI'
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
