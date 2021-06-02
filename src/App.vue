<template>
  <v-app>
    <v-system-bar app style="-webkit-app-region: drag;">
      <v-spacer></v-spacer>
      <span>Todo</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-switch
          style="margin-top: 22px"
          v-model="$vuetify.theme.dark"
          @click="editTheme"
      ></v-switch>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

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
      <v-container style="margin-bottom: 20px">
        <router-view/>
        <v-btn
            elevation="2"
            bottom
            right
            fab
            icon
            fixed
            @click="$vuetify.goTo(0, 'duration')"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
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
      { title: 'todo', icon: 'mdi-view-dashboard' },
      { title: '命令', icon: 'mdi-apple-keyboard-command' },
      { title: '记事本', icon: 'mdi-microsoft-onenote' }],
  }),
  mounted() {
    const dark = JSON.parse(window.localStorage.getItem('dark'));
    if (dark !== null) {
      this.$vuetify.theme.dark = dark;
    }
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
