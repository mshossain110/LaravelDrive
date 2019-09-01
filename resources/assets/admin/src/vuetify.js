import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: colors.grey.darken3,
                secondary: colors.blue.darken3,
                accent: colors.lightGreen.darken3,
                error: colors.red.base,
                warning: colors.yellow.darken1,
                info: colors.blue.darken1,
                success: colors.green.darken2
            }
        }
    }
})
