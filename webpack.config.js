const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const isDev = process.env.NODE_ENV !== 'production'
/**
 * required variables
 */

var plugins = []

plugins.push(
    new VueLoaderPlugin()
)

plugins.push(
    new VuetifyLoaderPlugin()
)
if (!isDev) {
    plugins.push(
        new MiniCssExtractPlugin({
            filename: '/../css/[name].css',
            chunkFilename: '[id].css'
        })
    )
}

function adminPath (dir = '') {
    return path.join(__dirname, './resources/assets/admin/src', dir)
}
function assetsPath (dir = '') {
    return path.join(__dirname, './resources/assets/', dir)
}

function publicPath (dir = '') {
    return path.join(__dirname, './public/', dir)
}

// webpack configaration

module.exports = {
    entry: {
        config: assetsPath('common/config.js'),
        admin: adminPath('main.js'),
        auth: assetsPath('auth/auth.js')
    },

    output: {
        filename: '[name].js',
        path: publicPath('js'),
        publicPath: ''
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@ac': adminPath('components'),
            '@auth': assetsPath('auth'),
            '@common': assetsPath('common')
        }
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                  !/\.vue\.js/.test(file)
                )
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1, minimize: true }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                            // fiber: require('fibers'),
                            // indentedSyntax: true // optional
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../images/',
                    publicPath: '/images/',
                    useRelativePath: process.env.NODE_ENV === 'production'
                }
            }
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: plugins
}
