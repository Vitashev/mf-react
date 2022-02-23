const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../package.json').dependencies;

module.exports = (config, context) => {
  return {
    ...config,
    devServer: {
      ...config.devServer,
      // HACK ALERT: during async module loading, webpack will try to load the remote entry from http://localhost:3000
      // and when it is not ready, it will start to redirect to http://localhost:5000 (local address) and throw the error,
      // We need to force compiler to resolve the remote script strictly from remote host http://localhost:3000.
      proxy: {
        'http://localhost:3000': 'http://localhost:3000',
      },
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          remote: 'remote@http://localhost:3000/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
};
