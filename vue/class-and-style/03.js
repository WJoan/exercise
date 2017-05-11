/**
 * 绑定 class 的时候，只能使得某一种 class 属性出现或者不出现
 * 绑定 style 内联样式的时候，可以在 Vue 属性中通过 js 设置具体的样式
 */
var app1 = new Vue({
  el: '#app1',
  data: {
    isActive: true,
    hasError: true
  }
})

var app2 = new Vue({
  el: '#app2',
  data: {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
})

/* 常用 */
var app3 = new Vue({
  el: '#app3',
  data: {
    isActive: true,
    error: null
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal',
      }
    }
  }
})

var app4 = new Vue({
  el: '#app4',
  data: {
    activeColor: 'red',
    fontSize: 30
  }
})

var app5 = new Vue({
  el: '#app5',
  data: {
    baseStyles: {
      color: 'red',
    },
    overridingStyles: {
      fontSize: '18px'
    }
  }
})