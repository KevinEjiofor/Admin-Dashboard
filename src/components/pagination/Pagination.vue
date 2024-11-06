<!--<script>-->
<!--export default {-->
<!--  name: "NavigatePage"-->
<!--}-->
<!--const paginatedUsers = computed(() => {-->
<!--  const start = (currentPage.value - 1) * rowsPerPage.value;-->
<!--  const end = start + rowsPerPage.value;-->
<!--  return filteredAndSearchedUsers.value.slice(start, end);-->
<!--});-->

<!--const allSelected = computed(() => {-->
<!--  return paginatedUsers.value.length > 0 &&-->
<!--      selectedUsers.value.length === paginatedUsers.value.length;-->
<!--});-->

<!--const nextPage = () => {-->
<!--  if (currentPage.value * rowsPerPage.value < filteredAndSearchedUsers.value.length) {-->
<!--    currentPage.value += 1;-->
<!--  }-->
<!--};-->

<!--const previousPage = () => {-->
<!--  if (currentPage.value > 1) {-->
<!--    currentPage.value -= 1;-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<template>-->

<!--  <div class="pagination-controls">-->
<!--    <button @click="previousPage" :disabled="currentPage === 1"></button>-->
<!--    <span>Page {{ currentPage }}</span>-->
<!--    <button @click="nextPage" :disabled="currentPage * rowsPerPage >= filteredAndSearchedUsers.length"></button>-->
<!--    <label>Rows per page:</label>-->
<!--    <select v-model="rowsPerPage">-->
<!--      <option :value="10">10</option>-->
<!--      <option :value="20">20</option>-->
<!--      <option :value="30">30</option>-->
<!--    </select>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->
