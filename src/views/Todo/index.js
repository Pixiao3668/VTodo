const dayjs = require('dayjs')
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
        removeDialog: false,
        editDialog: false,
        index: null,
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
    created() {
        let db = JSON.parse(window.localStorage.getItem('tasks')) ;
        if (db !== null) {
            this.tasks = db;
        } else {
            this.tasks = [];
        }
    },
    methods: {
        create() {
            if (this.newTask !== null && this.newTask.length !== 0) {
                this.tasks.unshift({
                    done: false,
                    text: this.newTask,
                    time: dayjs().format('YYYY年MM月DD日')
                });
            }
            this.saveToDb();
            this.newTask = null
        },
        deleteTask() {
            this.tasks.splice(this.index, 1);
            this.index = null;
            this.saveToDb();
            this.removeDialog = false;
        },
        finish(index) {
            if (this.tasks[index].done) {
                this.finishTask = this.tasks[index];
                this.tasks.splice(index, 1);
                this.tasks.push(this.finishTask);
                this.finishTask = null;
                this.saveToDb();
            } else {
                this.finishTask = this.tasks[index];
                this.finishTask.done = false;
                this.tasks.splice(index, 1);
                this.tasks.unshift(this.finishTask);
                this.finishTask = null;
                this.saveToDb();
            }

        },
        test() {
            // // 声明 class
            // const Todo = AV.Object.extend('todo');
            //
            // // 构建对象
            // const todo = new Todo();
            //
            // // 为属性赋值
            // todo.set('title', '工程师周会');
            // todo.set('content', '周二两点，全体成员');
            //
            // // 将对象保存到云端
            // todo.save().then((todo) => {
            //     // 成功保存之后，执行其他逻辑
            //     console.log(`保存成功。objectId：${todo.id}`);
            // }, (error) => {
            //     // 异常处理
            //     console.log(error);
            // });
            //
            //
            // const query = AV.Query('todo');
            // query.get('60b1101c3a9657317b606256').then((todo) => {
            //     console.log(todo.toJSON());
            // })
        },
        saveToDb() {
            window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        removeDia(index){
            this.removeDialog = true;
            this.index = index;
        },
        editDia(index){
            this.editDialog = true;
            this.index = index;
        }
    },
}
