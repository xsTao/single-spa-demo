const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/portal.js',
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader',
        }],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析
            filename: 'index.html', // 默认情况下生成的 html 文件叫 index.html
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            inject: true,
            // hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }),
        // { from: path.resolve(__dirname, 'src/style.css') },
        CopyWebpackPlugin([
            // { from: path.resolve(__dirname, './index.html') },
            { from: path.resolve(__dirname, 'libs/system.js') },
        ]),
        new CleanWebpackPlugin(['release'])
    ],
    devtool: 'source-map',
    externals: [],
    mode: 'development',
    devServer: {
        contentBase: './release',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // Proxy config for development purposes. In production, you would configure you webserver to do something similar.
        proxy: {
            "/app1": {
                target: "http://localhost:9001",
                pathRewrite: { "^/app1": "" }
            },
            "/app2": {
                target: "http://localhost:9002",
                pathRewrite: { "^/app2": "" }
            },
            "/app3": {
                target: "http://localhost:9003",
                pathRewrite: { "^/app3": "" }
            },
            "/app4": {
                target: "http://localhost:9004",
                pathRewrite: { "^/app4": "" }
            },
            "/app5": {
                target: "http://localhost:9005",
                pathRewrite: { "^/app5": "" }
            }
        }
    }
};