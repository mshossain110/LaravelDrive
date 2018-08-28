const path = require('path');

/**
 * required variables
 */
var plugins = [];

function adminPath (dir = '') {
    return path.join(__dirname, './resources/assets/admin/src', dir);
}

function publicPath (dir = '') {
    return path.join(__dirname, './public/js', dir);
}


// webpack configaration

module.exports = {
    entry: {
        config: adminPath('config/config.js'),
        admin: adminPath('main.js')
    },

    output: {
        filename: '[name].js',
        path: publicPath(),
        publicPath: '',
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@ac' : adminPath('components'),
            '@ap' : adminPath('pages'),
            '@au' : adminPath('utils')
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
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            }
        ]
    },

    plugins: plugins
}