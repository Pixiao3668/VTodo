<template>
  <v-app class="-webkit-scrollbar">
    <div>
      <v-system-bar
          lights-out
          style="-webkit-app-region: drag; position: fixed; top: 0; right: 0; width: 100%; z-index: 50;"
          height="25">
        <v-spacer></v-spacer>
        <span>Todo</span>
        <v-spacer></v-spacer>
      </v-system-bar>
    </div>
    <div>
      <v-app-bar
          dense
          style="-webkit-app-region: drag; position: fixed; top: 25px; right: 0; width: 100%; z-index: 50"
      >
        <!--        <v-btn icon @click.stop="drawer = !drawer">-->
        <!--          <v-icon>mdi-palette</v-icon>-->
        <!--        </v-btn>-->
        <v-avatar size="48" style="margin-right: 15px" tile>
          <img
              src='./assets/logo.png'
              alt="John"
          >
        </v-avatar>
        <!--        <v-icon size="40" style="margin-right: 15px">-->
        <!--          mdi-format-list-checks-->
        <!--        </v-icon>-->
        <v-tabs>
          <v-tab v-for="item in tabs" :key="item" @click="changeView(item)">{{ item }}</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-switch
            style="margin-top: 22px"
            v-model="$vuetify.theme.dark"
        ></v-switch>

        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <router-view style="margin-top: 100px"/>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    tabs: ["todo", "命令", "记事本"]
  }),
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
