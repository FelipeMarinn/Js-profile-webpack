// agregar plugins 
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js', // archivode entrada
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development', // definimos como configuracion para modo de desarrollo
    watch: true, // observa los cambios de nuestro proyecto y lo vuelve a preparar o lanzarr
    resolve: {
        extensions: ['.js'],
        // definir alias para identificar nuestros archivos
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        // reglas : extenciones a utilizar, usar loaders
        rules: [
            {
                test: /\.m?js^$/,// LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // excluir archivos
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'aplication/font-woff',
                        name: '[name].[contenthash].[ext]',
                        outputPath: './assets/fonts/',
                        publicPath: '../assets/fonts/',
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        // configuraciones del html plugin
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // mover archivos al build
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv() // agregar dotenv para definir variables de entorno
    ]
}