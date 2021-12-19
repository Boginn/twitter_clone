import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1d9bf0',
        secondary: '#15181c',

        bgcolor: '#000000',
        accent: '#000081',

        vuegrey: '#babbc3',
        error: '#e42315',
        success: '#24aa0e',
        balance: '#172f85',
      },
    },
  },
});
