<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
        {{ item.label }}
      </li>
    </ul>
    <p>child tells me:{{ childWords }}</p>
    <component-a msgfromfather='father' @child-tell-me="listenToMyBoy"></component-a>
  </div>
</template>

<script>
import Store from './store'
import ComponentA from './components/ComponentA.vue'

export default {
  data: function() {
    return {
      title: 'Todo list',
      items: Store.fetch(),
      newItem: '',
      childWords: '',
    }
  },
  components: { ComponentA },
  watch: {
    items: {
      handler: function(val, oldVal){
        Store.save(val)
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function(item){
      item.isFinished = !item.isFinished;
    },
    addNew: function () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      });
      this.newItem = '';
    },
    listenToMyBoy : function (msg) {
      this.childWords = msg;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 300px;
}
.finished{
  color: green;
  font-weight: 800;
}
</style>
