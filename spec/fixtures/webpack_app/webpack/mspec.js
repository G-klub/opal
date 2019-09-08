// require requirements used below
const path = require('path');
const OwlResolver = require('opal-webpack-loader/resolver'); // to resolve ruby files

const common_config = {
    context: path.resolve(__dirname, '../opal'),
    mode: "development",
    optimization: {
        minimize: false // dont minimize for debugging
    },
    performance: {
        maxAssetSize: 20000000,
        maxEntrypointSize: 20000000
    },
    // use one of these below for source maps
    devtool: 'source-map', // this works well, good compromise between accuracy and performance
    // devtool: 'cheap-eval-source-map', // less accurate
    // devtool: 'inline-source-map', // slowest
    // devtool: 'inline-cheap-source-map',
    output: {
        // webpack-dev-server keeps the output in memory
        filename: '[name].js',
        path: path.resolve(__dirname, '../public/assets'),
        publicPath: '/assets/'
    },
    resolve: {
        plugins: [
            // this makes it possible for webpack to find ruby files
            new OwlResolver('resolve', 'resolved', [
                'opal/platform.rb',
                'mspec-opal/runner.rb',
                'stdlib/erb/erb_spec.rb',
            ])
        ]
    },
    module: {
        rules: [
            {
                // opal-webpack-loader will compile and include ruby files in the pack
                test: /.(rb|js.rb)$/,
                use: [
                    {
                        loader: 'opal-webpack-loader',
                        options: {
                            sourceMap: true,
                            hmr: false,
                            hmrHook: '',
                            includePaths: [ path.resolve(__dirname, '../../../tasks/testing/') ],
                            requireModules: [ 'mspec_special_calls' ],
                            dynamicRequireSeverity: 'warning',
                            compilerFlagsOn: [ 'arity_check', 'enable_source_location' ]
                        }
                    }
                ]
            }
        ]
    }
};

const browser_config = {
    target: 'web',
    entry: {
        application: [path.resolve(__dirname, '../javascripts/application.js')]
    }
};

const ssr_config = {
    target: 'node',
    entry: {
        application_ssr: [path.resolve(__dirname, '../javascripts/application.js')]
    }
};

const web_worker_config = {
    target: 'webworker',
    entry: {
        web_worker: [path.resolve(__dirname, '../javascripts/application.js')]
    }
};

const browser = Object.assign({}, common_config, browser_config);
const ssr = Object.assign({}, common_config, ssr_config);
const web_worker = Object.assign({}, common_config, web_worker_config);

module.exports = [ browser ];