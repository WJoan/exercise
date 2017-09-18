// 创建虚拟DOM
function nodeToFragment (node, vm) {
  var vdom = document.createDocumentFragment(),
      child = node && node.firstChild;

  // 劫持node所有子节点到虚拟dom下
  // appendChild方法会先将原有的dom从文档移除然后再加到父节点中
  // 因此不能使用cloneNode方法
  while(child){
    compile(child, vm);
    // 处理节点魔板
    vdom.appendChild(child);
    child = node.firstChild;
  }

  return vdom;
}

// 被观察者类
// 维护一个数组保存观察对象
// 提供注册和通知的方法
function Dep () {
  this.subs = [];
}
Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub);
  },
  notify () {
    this.subs.forEach( function(sub) {
      sub.update();
    });
  }
}

// 观察者类
// 初始化的时候触发vm中数据的getter完成注册
// 提供update方法，用于模板的更新
function Watcher (vm, node, name) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  update () {
    // 得到新的数据
    this.get();
    // 更新模板
    if(this.node.nodeType === 1){
      this.node.value = this.value;
    }else{
      this.node.nodeValue = this.value;
    }
  },
  get () {
    this.value = this.vm[this.name];
  }
}

// 解析模板
// 通过正则匹配vue的模板，新建观察者对象，绑定到数据上
// 事件绑定，用户操作时候及时更新vm数据（而不是直接更新模板）
function compile (node, vm) {
  var reg = /\{\{(.*)\}\}/;

  // 元素
  if(node.nodeType === 1) {
    var attr = node.attributes || [];
    for (var i = 0; i < attr.length; i++) {
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue;
        // 绑定事件：视图修改的时候，vm对应的数据也同时修改
        node.addEventListener('input', function (e) {
          vm[name] = e.target.value;
        })
        node.value = vm.data[name];
        node.removeAttribute('v-model');
        new Watcher(vm, node, name);
      }
    }
  }

  // 文本
  if (node.nodeType === 3) {
    if( reg.test(node.nodeValue) ){
      var name = RegExp.$1;
      name = name.trim();
      new Watcher(vm, node, name);
    }
  }
}

// 通过defineProperty数据劫持
// 定义对象属性的getter与setter
// 为每一个数据绑定一个被观察者对象
function defineReactive(obj, key, val) {
  // 管理所有与该参数有关的观察者
  var dep = new Dep();

  Object.defineProperty(obj, key, {
    get () {
      // 渲染视图的时候将watcher注册到dep中
      if (Dep.target) dep.addSub(Dep.target);
      console.log('get data:' + val);
      return val;
    },
    set (newVal) {
      if(newVal === val){
        return;
      }
      val = newVal;
      // 发布者发出更新通知
      dep.notify();
      console.log('set data:' + newVal);
    }

  })
}

// 将obj中的变量都赋予vm 并且劫持数据
function observe (obj, vm) {
  Object.keys(obj).forEach( function(key, index) {
    defineReactive(vm, key, obj[key]);
  });
}

function Vue (options) {
  var data = this.data = options.data;
  // 让vm监听每一个挂载的数据
  observe(data, this);

  // 创建虚拟DOM节点
  // 避免频繁修改文档
  var id = options.el;
  var vdom = nodeToFragment(document.getElementById(id), this);
  // 一次性插入虚拟节点到文档中
  document.getElementById(id).appendChild(vdom);
}

var vm = new Vue({
  el: 'app',
  data: {
    text: 'the vue simulation'
  }
})