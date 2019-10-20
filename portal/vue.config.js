// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    configureWebpack: config => {
        config.plugins.push(new HtmlWebpackPlugin({
            template: './index.html', //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析
            filename: 'index.html', // 默认情况下生成的 html 文件叫 index.html
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            inject: true,
            // hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }))
    }
}