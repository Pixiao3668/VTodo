<template>
  <v-container style="max-width: 500px">
    <v-text-field
        v-model="newTask"
        label="今日事今日毕"
        solo
        @keydown.enter="create"
    >
      <template v-slot:append>
        <v-icon
            v-if="newTask"
            @click="test"
        >
          添加
        </v-icon>
      </template>
    </v-text-field>

    <h2 class="display-1 success--text pl-4">
      待办事项:&nbsp;
      <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row
        class="my-1"
        align="center"
    >
      <strong class="mx-4 info--text text--darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
          :value="progress"
          color="deep-orange lighten-2"
          class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0" hover>
      <template v-for="(task, i) in tasks">
        <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
        ></v-divider>

        <v-list-item :key="`${i}-${task.text}`" @dblclick="deleteTask(i)">
          <v-list-item-action color="primary">
            <v-checkbox
                v-model="task.done"
                :color="task.done && 'grey' || 'primary'"
                @click="finish(i)"
            >
              <template v-slot:label>
                <div
                    :class="task.done && 'grey--text' || 'primary--text'"
                    class="ml-4"
                    v-text="task.text"

                >
                </div>
              </template>
            </v-checkbox>
          </v-list-item-action>

          <v-spacer></v-spacer>

          <v-scroll-x-transition>
              <span
                  :class="task.done && 'grey--text' || 'primary--text'"
                  style="margin-right: 40px"
                  v-text="task.time">
              </span>
          </v-scroll-x-transition>
          <v-scroll-x-transition>
            <v-icon
                v-if="task.done"
                color="success"
            >
              mdi-check
            </v-icon>
          </v-scroll-x-transition>
        </v-list-item>
      </template>
    </v-card>
  </v-container>
</template>
<script>
const AV = require('leancloud-storage');
AV.init({
  appId: "7EmnrAlhHmgKiV3ut9GR5vMN-gzGzoHsz",
  appKey: "E9N6LU730Vbwk5GAacJOn2FV",
  serverURL: "https://7emnralh.lc-cn-n1-shared.com"
});

export default {
  data: () => ({
    tasks: [
      {
        done: false,
        text: 'Foobar',
        time: '2021.10.23',
      },
      {
        done: false,
        text: 'Fizzbuzz',
        time: '2022.10.23'
      },
    ],
    newTask: null,
    delTask: null,
    finishTask: null,
  }),

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length
    },
    progress() {
      return this.completedTasks / this.tasks.length * 100
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks
    },
  },

  methods: {
    create() {
      this.tasks.unshift({
        done: false,
        text: this.newTask,
      })
      window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
      console.log(JSON.parse(window.localStorage.getItem('tasks')));

      this.newTask = null
    },
    deleteTask(index) {
      console.log(index);
      this.tasks.splice(index, 1);
    },
    finish(index) {
      if (this.tasks[index].done) {
        this.finishTask = this.tasks[index];
        this.tasks.splice(index, 1);
        this.tasks.push(this.finishTask);
        this.finishTask = null;
      } else {
        this.finishTask = this.tasks[index];
        this.finishTask.done = false;
        this.tasks.splice(index, 1);
        this.tasks.unshift(this.finishTask);
        this.finishTask = null;
      }

    },
    test() {
      // 声明 class
      const Todo = AV.Object.extend('todo');

      // 构建对象
      const todo = new Todo();

      // 为属性赋值
      todo.set('title', '工程师周会');
      todo.set('content', '周二两点，全体成员');

      // 将对象保存到云端
      todo.save().then((todo) => {
        // 成功保存之后，执行其他逻辑
        console.log(`保存成功。objectId：${todo.id}`);
      }, (error) => {
        // 异常处理
        console.log(error);
      });


      const query = AV.Query('todo');
      query.get('60b1101c3a9657317b606256').then((todo) => {
        console.log(todo.toJSON());
      })
    }
  },
}
</script>
