const mix = require('laravel-mix');
const path = require('path');
require('laravel-mix-eslint-config');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

function adminPath (dir = '') {
    return path.join(__dirname, './resources/assets/admin/src', dir);
}
function assetsPath (dir = '') {
    return path.join(__dirname, './resources/assets/', dir);
}

function publicPath (dir = '') {
    return path.join(__dirname, './public/', dir);
}

mix.webpackConfig(webpack => {
    return {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss'],
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                node_modules: path.resolve(__dirname, './node_modules'),
                '@ac': adminPath('components'),
                '@auth': assetsPath('auth'),
                '@common': assetsPath('common')
            }
        },
        plugins: [
            new VuetifyLoaderPlugin()
        ]
    };
});

mix.extract()
    .js(assetsPath('common/config.js'), 'public/js')
    .js(adminPath('main.js'), 'public/js')
    .js(assetsPath('auth/auth.js'), 'public/js')
    .eslint();

mix.sass('resources/assets/admin/src/sass/main.scss', 'public/css');
