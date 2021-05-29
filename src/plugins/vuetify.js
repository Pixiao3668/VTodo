import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'
// 由Vuetify（javascript）提供的翻译
import {en, zhHans} from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { en, zhHans},
        current: 'zhHans',
    },
    theme: {
        themes: {
            light: {
                primary: '#2196F3',
                secondary: '#009688',
                accent: '#009688',
                error: '#f44336',
                warning: '#ff5722',
                info: '#607d8b',
                success: '#4caf50'
            },
            dark: {
                primary: '#FF5722',
                secondary: '#FFCCBC',
                accent: '#009688',
                error: '#f44336',
                warning: '#ff5722',
                info: '#607d8b',
                success: '#4caf50'
            }
        },
    },
});
