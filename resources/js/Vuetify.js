import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

const LaravelDrive = {
    dark: false,
    colors: {
      header: colors.indigo.darken1,
      nav: colors.grey.lighten4,
      footer: colors.indigo.lighten3,
      primary: colors.indigo.lighten3,
      secondary: colors.indigo.darken3,
      accent: colors.indigo.accent1,
      error: colors.red.darken1,
      warning: colors.yellow.darken1,
      info: colors.blue.lighten5,
      success: colors.green.darken1
    }
  }
  
 export default createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
    components,
    directives,
    theme: {
      defaultTheme: 'LaravelDrive',
      themes: {
        LaravelDrive,
      }
    }
  })