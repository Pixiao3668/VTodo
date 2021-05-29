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
    rtl: false,
    theme: {
        dark: false,
        default: 'light',
        disable: false,
        options: {
            cspNonce: undefined,
            customProperties: undefined,
            minifyTheme: undefined,
            themeCache: undefined,
        },
        themes: {
            light: {
                primary: '#1976D2',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
            dark: {
                primary: '#FF5722',
                secondary: '#424242',
                accent: '#FF4081',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
        },
    },
    // theme: {
    //     themes: {
    //         light: {
    //             primary: colors.blue.accent2,
    //             secondary: '#009688',
    //             accent: '#009688',
    //             error: '#f44336',
    //             warning: '#ff5722',
    //             info: '#607d8b',
    //             success: '#4caf50'
    //         },
    //         dark: {
    //             primary: '#FF5722',
    //             secondary: '#FFCCBC',
    //             accent: '#009688',
    //             error: '#f44336',
    //             warning: '#ff5722',
    //             info: '#607d8b',
    //             success: '#4caf50'
    //         }
    //     },
    // },
});
