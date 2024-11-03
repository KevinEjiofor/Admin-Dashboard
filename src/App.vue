<template>
  <div id="app">

    <main>

      <UserTable />
    </main>
  </div>
</template>

<script>
import UserTable from './components/userTable/UserTable.vue';

export default {
  name: 'App',
  components: {
    UserTable,
  },
};
</script>

<style>

#app {
  background-color: #F2F0F9;
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
}

main {
  padding: 2rem;
}
</style>
