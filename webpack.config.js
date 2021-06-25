const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")
require('babel-polyfill')

module.exports = {
    entry: {
        main: ['babel-polyfill' ,path.resolve(__dirname, 'dev', 'js', 'app')],
    },
    output: {
        path: path.resolve(__dirname, './static'),
        filename: '[name].bundle.js',
        assetModuleFilename: "img/[name][ext]"
    },
    mode: "development",
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new CopyPlugin({
            patterns: [
                { from: "./dev/img", to: "./img" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    stats: 'minimal',
}