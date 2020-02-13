const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css打包成单独的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const TerserPlugin = require('terser-webpack-plugin'); // js压缩
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清除打包目录内容
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy文件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 添加资源文件
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 构建缓存，提高构建速度
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pages = require('./createHtmls')();
module.exports = {
    entry: {
        home: './src/pages/home/home.js',
        index: './src/pages/index/index.js'
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    optimization: { // 优化项
        splitChunks: {
            cacheGroups: {
                commons: {
                    minChunks: 2,
                    minSize: 0,
                    chunks: 'initial',
                    name: 'commons',
                    priority: -2
                },
                vendor: {
                    test: /node_modules/,
                    priority: -1,
                    minChunks: 2,
                    minSize: 0,
                    chunks: 'initial',
                    name: "vendor"
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 禁用提取注释
                terserOptions: {
                    compress: {
                        // drop_console: true, // 去掉代码中的打印
                    },
                }
            }), // js压缩
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'), // cssnano 将你的 CSS 文件做 多方面的的优化，以确保最终生成的文件 对生产环境来说体积是最小的。。
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                canPrint: true
            }),
        ],
    },
    // watch: true, // 监听文件变化，实时打包
    // watchOptions: {
    //     poll: 1000, // 监听文件变化的轮询间隔
    //     aggregateTimeout: 500, // 当文件发生变化时，延迟多少毫秒后重构
    //     ignored: '/node_modules/' // 排除node_modules文件
    // },
    plugins: [
        ...pages,
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: "[id].css"
        }), // 将样式抽离成一个css文件
        new webpack.ProvidePlugin({
            '$': 'jquery', // npm
        }), // 全局注入插件
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     {from: 'doc', to: './doc'}
        // ]),
        new HardSourceWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        noParse: /jquery/, // 不去解析对应库中的依赖，缩减构建时间
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 默认生成使用ES模块语法的JS模块，这跟html-withimg-loader有冲突
                        limit: 1,
                        outputPath: 'image/',
                        // publicPath: '' // 图片路径前缀
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: "eslint-loader",
                    options: {
                        enforce: "pre",
                    }
                },
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "components": path.resolve('src/components/'),
            '@': path.resolve('src')
        },
        extensions: ['.js', '.vue'], // 省略后缀后，通过该配置去匹配对应后缀的文件
    },
    // noParse: /jquery/
}