<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: 'Todo list',
      items: [
        {
          label: 'codeing',
          isFinished: false
        },
        {
          label: 'walking',
          isFinished: true
        }
      ],
      newItem: '',
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
