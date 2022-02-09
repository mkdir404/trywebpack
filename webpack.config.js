const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimierPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
     output: { 
            path: path.resolve(__dirname, 'dist'), 
            filename: '[name].[contenthash].js',
            assetModuleFilename : 'assets/images/[hash][ext][query]'
        },
    resolve : {
        extensions : ['js'],
        alias : {
            '@utils' : path.resolve(__dirname, 'src/utils/'),
            '@templates' : path.resolve(__dirname, 'src/templates/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
            '@images' : path.resolve(__dirname, 'src/assets/images/'), 
        }
    },
    module : {
        rules : [
            {
                test : /\.m?js$/,
                exclude : /(node_modules|bower_components)/,
                use : {
                    loader : 'babel-loader',
                }
            },
            {
                test : /\.css|.styl$/,
                use:[MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader']
            },{
                test: /\.(png|jpg|gif|svg)$/,
                type : 'asset/resource',
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use : {
                    loader: 'url-loader',
                    options: {
                        limit : 10000,
                        mimetype : 'application/font-woff',
                        name : '[name].[contenthash].[ext]',
                        outputPath : "./assets/fonts",
                        publicPath : "./assets/fonts",
                        esModule : false
                    }
                }
            }
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            inject : true,
            template : './public/index.html',
            filename : 'index.html'
        }),
        new MiniCssExtractPlugin({
                filename : "assets/[name].[contenthash].css"
            }),
        new CopyWebpackPlugin({
            patterns : [{
                from : path.resolve(__dirname, "src","assets/images"),
                to : "assets/images"
            }]
        }),
        new Dotenv(),
        new CleanWebpackPlugin()
    ]
        
    ,
    optimization : {
        minimize : true,
        minimizer : [
            new CssMinimierPlugin(),
            new TerserPlugin()
        ]
    }
} 