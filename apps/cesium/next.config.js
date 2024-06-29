// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },

  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true
  },

  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              '../../node_modules/@cesium/engine/Source/Assets'
            ),
            to: path.join(__dirname, 'public/cesium/Assets')
          },
          {
            from: path.join(
              __dirname,
              '../../node_modules/@cesium/engine/Build/ThirdParty'
            ),
            to: path.join(__dirname, 'public/cesium/ThirdParty')
          },
          {
            from: path.join(
              __dirname,
              '../../node_modules/@cesium/engine/Build/Workers'
            ),
            to: path.join(__dirname, 'public/cesium/Workers')
          }
        ]
      })
    )
    return config
  }
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx
]

module.exports = composePlugins(...plugins)(nextConfig)
