<template>
  <v-app>
    <v-system-bar app style="-webkit-app-region: drag;" :color="$vuetify.theme.dark ? 'black' : 'white'">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>

<!--    <v-app-bar app>-->
<!--      <v-spacer></v-spacer>-->
<!--    </v-app-bar>-->

    <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        temporary
    >
      <v-list-item>
        <v-list-item-content align="center">
          <v-list-item-title>
            工具
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="changeView(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            登陆/注册
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view/>
        <v-speed-dial
            fixed
            v-model="fab"
            bottom
            right
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
        >
          <template v-slot:activator>
            <v-btn
                fab
            >
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-tools
              </v-icon>
            </v-btn>
          </template>
          <v-btn
              fab
              dark
              small
              :color="$vuetify.theme.dark ? 'green' : 'black'"
              @click="editTheme"
          >
            <v-icon>mdi-palette</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              small
              :color="$vuetify.theme.dark ? 'indigo' : 'black'"
              @click="drawer = !drawer"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              small
              @click="$vuetify.goTo(0)"
              :color="$vuetify.theme.dark ? 'red' : 'black'"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    tabs: ["todo", "命令", "记事本"],
    items: [
      {title: 'todo', icon: 'mdi-view-dashboard'},
      {title: '命令', icon: 'mdi-apple-keyboard-command'},
      {title: '记事本', icon: 'mdi-microsoft-onenote'}],

    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    transition: 'slide-y-reverse-transition',
  }),
  mounted() {
    const dark = JSON.parse(window.localStorage.getItem('dark'));
    if (dark !== null) {
      this.$vuetify.theme.dark = dark;
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return {class: 'purple', icon: 'account_circle'}
        case 'two':
          return {class: 'red', icon: 'edit'}
        case 'three':
          return {class: 'green', icon: 'keyboard_arrow_up'}
        default:
          return {}
      }
    },
  },
  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    },
  },
  methods: {
    changeView: function (tab) {
      switch (tab) {
        case 'todo':
          this.$router.replace('Todo');
          break;
        case '命令':
          this.$router.replace('About');
          break;
        case '记事本':
          this.$router.replace('Test');
          break;
      }
    },
    editTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      window.localStorage.setItem('dark', this.$vuetify.theme.dark.toString());
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
