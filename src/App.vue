<template>
  <div id="app">

    <main>

      <AdminTable />
    </main>
  </div>
</template>

<script>
import AdminTable from "@/adminPage/adminTable/AdminTable.vue";

export default {
  name: 'App',
  components: {
    AdminTable,
  },
};
</script>

<style>

#app {



  font-family: inter;
  text-align: center;
  color: #333;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
}


</style>
