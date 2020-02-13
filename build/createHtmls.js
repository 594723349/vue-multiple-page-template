/*
 * @Description: 生成html配置项
 * @Author: chenxiaofan
 * @Date: 2020-02-13 21:58:30
 * @LastEditors  : chenxiaofan
 * @LastEditTime : 2020-02-13 22:44:01
 * @FilePath: \vue-multiple-page-template\build\createHtmls.js
 */
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html文件
function createHtml() {
    const htmls = [];
    glob.sync("./src/pages/**/*.html").forEach(function (entry) {
        let filename = path.basename(entry);
        htmls.push(new HtmlWebpackPlugin({
            template: entry,
            filename,
            minify: {
                collapseWhitespace: true, // 变成一行
            },
            chunks: ['vendor', 'commons', filename.replace('.html', "")]
        }))
    })
    return htmls;
}
module.exports = createHtml;
