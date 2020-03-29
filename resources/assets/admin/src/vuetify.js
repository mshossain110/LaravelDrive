import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import { Ripple } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
    directives: {
        Ripple
    }
});

export default new Vuetify({
    scrollBarWidth: 16,
    icons: {
        iconfont: 'mdi'
    },
    rtl: false,
    theme: {
        dark: false,
        default: 'light',
        disable: false,
        options: {
            cspNonce: undefined,
            customProperties: undefined,
            minifyTheme: undefined,
            themeCache: undefined
        },
        themes: {
            light: {
                header: colors.indigo.darken1,
                nav: colors.grey.lighten4,
                footer: colors.indigo.lighten3,
                primary: colors.indigo,
                secondary: colors.indigo.darken3,
                accent: colors.indigo.accent1,
                error: colors.red.darken1,
                warning: colors.yellow.darken1,
                info: colors.blue.lighten5,
                success: colors.green.darken1
            },
            dark: {
                header: colors.indigo.darken4,
                nav: colors.indigo.darken2,
                footer: colors.indigo.lighten3,
                primary: colors.indigo.lighten5,
                secondary: colors.indigo.darken3,
                accent: colors.indigo.accent1,
                error: colors.red.darken1,
                warning: colors.yellow.darken1,
                info: colors.blue.lighten5,
                success: colors.green.darken1
            }
        }
    }
});
