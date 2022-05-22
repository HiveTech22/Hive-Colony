const withPWA = require('next-pwa')

module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development'
      },
    images: {
        domains: ['localhost','picsum.photos', 'demo.themesberg.com', 'i.ibb.co'],
    },
    env: {
        MAPBOXGL_KEY:
            'pk.eyJ1IjoibWlkc2hvdDE3IiwiYSI6ImNsMzhvb21hOTAwNmkzZHFmaTR2ZXd4cmYifQ.PGTwJpHpA3xAeF6oZ_iZ0Q',
    }
})
