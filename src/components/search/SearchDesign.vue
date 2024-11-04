
<script>
import './SearchDesignStyle.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { useUserStore } from '@/store/users';
import { debounce } from 'lodash';

export default {
  name: "SearchDesign",
  data() {
    return {
      searchQuery: ''
    };
  },
  watch: {
    searchQuery: {
      handler: debounce(function(newQuery) {
        const userStore = useUserStore();
        userStore.searchUsers(newQuery);
      }, 300),
      immediate: true
    }
  }
}
</script>


<template>
  <div class="search-input-container">
    <i class="material-icons search-icon">search</i>
    <input v-model="searchQuery" placeholder="Search Users by Name, Email or Date" />
  </div>
</template>
