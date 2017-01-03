/**
 * Created by wangjianan on 17-1-3.
 */
const helpers = require('./config/helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./config/webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = function (env) {
    return webpackMerge(commonConfig({env: ENV}), {
        devtool: 'source-map',

        output: {
            path: helpers.root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),

            new WebpackMd5Hash(),

            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR
                }
            }),

            new UglifyJsPlugin({
                beautify: false, //prod
                output: {
                    comments: false
                }, //prod
                mangle: {
                    screw_ie8: true
                }, //prod
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false // we need this for lazy v8
                }
            })
        ]
    });
};