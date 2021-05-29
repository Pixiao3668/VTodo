import AV from 'leancloud-storage';

AV.init({
    appId: "7EmnrAlhHmgKiV3ut9GR5vMN-gzGzoHsz",
    appKey: "E9N6LU730Vbwk5GAacJOn2FV",
    serverURL: "https://7emnralh.lc-cn-n1-shared.com"
});

const Leancloud = {
    install: (Vue) => {
        Vue.component("Leancloud", AV);
    }
}

export default Leancloud;
