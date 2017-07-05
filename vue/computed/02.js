/**
 * 当绑定数据变化时候，你可能还希望模板中的数据，
 * 或者说前端显示的数据稍微处理一下再显示，
 * 这个时候你就要用到 computed 这个属性了。
 * 计算属性只有在它的相关依赖发生改变时才会重新求值。
 * 这就意味着只要 computed 使用到的绑定数据还没有发生改变，
 * 多次访问 computed 属性会立即返回之前的计算结果，而不必再次执行函数。
 */
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello',
    compute: 'lalala'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      alert(this.compute);
      return this.message.split('').reverse().join('')
    }
  }
})

var vm2 = new Vue({
  el: '#example2',
  data: {
    firstName: '',
    lastName: '',
  },
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
})

vm2.fullName = 'John Doe';

/**
 *  Vue 提供一个更通用的方法通过 watch 选项，来响应数据的变化。
 *  当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。
 *  watch 使得某一个绑定发生变化的时候就能够执行响应的操作。
 */
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
    // ajax请求直到用户输入完毕才会发出
    // 学习更多关于 _.debounce function (and its cousin
    // _.throttle), 参考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})