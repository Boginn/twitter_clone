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
        text: '#FFFFFF',
        logo: '#FFFFFF',

        accent: '#000081',
        error: '#e42315',
        success: '#24aa0e',
        balance: '#172f85',

        vuegrey: '#babbc3',
      },
      light: {
        primary: '#1d9bf0',
        secondary: '#fdfdfb',

        bgcolor: '#FFFFFF',
        text: '#000000',
        logo: '#1d9bf0',

        accent: '#000081',
        error: '#e42315',
        success: '#24aa0e',
        balance: '#172f85',

        vuegrey: '#babbc3',
      },
    },
  },
});
