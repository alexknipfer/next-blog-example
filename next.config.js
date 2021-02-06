module.exports = {
  images: {
    domains: ['media.graphcms.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
