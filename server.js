/**
 * Created by lichun on 2017/1/19.
 */
const express = require('express')
const path = require('path')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const forward = require('forward-request')
const webpackConfig = require('./build/webpack.dev.config')

const app = express()
if (process.env.NODE_ENV === 'production') {
    const compression = require('compression')
    app.use(compression())
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: '1d'
    }))
} else {
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler, {
        log: () => {}
    }))
}

app.use(function (req, resp, next) {

    if (~req.originalUrl.indexOf('/api')) {
        forward({
            req,
            resp,
            // host: 'crazybet.choopaoo.com',
            // ip: '192.168.50.12',
            host: 'crazybet.choopaoo.com',
            ip: '192.168.41.76',
            // host: 'crazybet.choopaoo.com',
            // ip: '106.75.167.151',
            path: req.originalUrl.replace('/api', ''),
            port: '3899',
            showLog: true
        })
        // 9899
    } else {
        forward({
            req,
            resp,
            host: 'crazybet.choopaoo.com',
            ip: '106.75.167.151',
            port: '80',
            showLog: true
        })
    }
    // 二维码是7899  下单接口是6899
})

let port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log(`Listening on port ${port}!`)
})
