<template>
  <v-app>
    <v-main>
      <v-container style="max-width: 600px">
        <v-text-field
            v-model="newTask"
            label="今日事今日毕"
            solo
            @keydown.enter="create"
        >
          <template v-slot:append>
            <v-icon
                v-if="newTask"
                @click="create"
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
            未完成: {{ remainingTasks }}
          </strong>

          <v-divider vertical></v-divider>

          <strong class="mx-4 success--text text--darken-2">
            已完成: {{ completedTasks }}
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

            <v-list-item :key="`${i}-${task.text}`" @dblclick="editDia(i)" @contextmenu.prevent="removeDia(i)">
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
                  style="margin-right: 10px"
                  v-text="task.time">
              </span>
              </v-scroll-x-transition>
            </v-list-item>
          </template>
        </v-card>
        <template>
          <v-row justify="center">
            <v-dialog
                v-model="removeDialog"
                persistent
                max-width="290"
            >
              <v-card>
                <v-card-title class="headline">
                  确定删除该事项？
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue-grey lighten-2"
                      text
                      @click="deleteTask()"
                  >
                    确定
                  </v-btn>
                  <v-btn
                      color="green lighten-2"
                      text
                      @click="removeDialog = false"
                  >
                    取消
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row justify="center">
            <v-dialog
                v-model="editDialog"
                max-width="400px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">编辑事项</span>
                </v-card-title>
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            label="事项名称"
                            prepend-icon="mdi-text"
                            v-model="editTask.text"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="日期"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="date"
                              @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
<!--                <v-card-text>-->
<!--                  <v-container>-->
<!--                    <v-row>-->
<!--                    </v-row>-->
<!--                  </v-container>-->
<!--                </v-card-text>-->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="editDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="editDialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>
<script src="./index.js"></script>
