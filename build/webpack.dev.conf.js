const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const webpack = require('webpack');
module.exports = merge(base, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devtool: 'source-map', // 源码映射
    devServer: {
        // hot: true,
        port: 3000,
        progress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                pathRewrite: {
                    '/api': ""
                }
            }
        }
        // contentBase: './dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新
        new webpack.NamedModulesPlugin(),
    ]
})