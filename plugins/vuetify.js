import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      global: {
      },
      VList: {
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {     
            'brand':colors.teal.darken1,
          }
        }, 
        dark :{
          colors: {
            'brand':colors.purple.darken4
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})