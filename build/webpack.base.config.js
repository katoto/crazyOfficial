/**
 * Created by lichun on 2017/1/18.
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// vendor 对公用的库进行打包

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: [path.join(__dirname, '../src/main.js')],
        vendor: ['vue', 'vue-router', 'vuex', 'v-tap', 'vuex-router-sync', 'es6-promise', 'axios']
    },
    output: {
        // filename: '[name]/main.[chunkhash:8].js',
        // filename: '[name]/main.js',
        filename: '[name].js?[chunkhash:8]',
        path: path.resolve(__dirname, '../dist/fkcqH5/'),
        publicPath: '/fkcqH5/',
        // chunkFilename: '[name].[chunkhash:8].chunk.js',
        // chunkFilename: '[name].chunk.js',
        chunkFilename: `[name].chunk.js?[chunkhash:8]`
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue'],
        modules: ['node_modules'],
        alias: {
            '~': path.resolve(__dirname, '../src'),
            '~common': path.resolve(__dirname, '../src/common'),
            'common': path.resolve(__dirname, '../src/common'),
            '~assets': path.resolve(__dirname, '../src/assets'),
            'static': path.resolve(__dirname, '../src/static'),
            '~static': path.resolve(__dirname, '../src/static'),
            'assets': path.resolve(__dirname, '../src/assets'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~router': path.resolve(__dirname, '../src/router')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new HtmlWebpackPlugin({
            filename: `index.html`,
            title: '疯狂猜球',
            minify: {
                collapseWhitespace: true
            },
            template: path.join(__dirname, '../src/index.html'),
            chunks: ['manifest', 'vendor', `main`]
        })
    ]
}
