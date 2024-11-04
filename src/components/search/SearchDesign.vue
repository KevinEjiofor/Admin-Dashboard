<script>
import './SearchDesignStyle.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { debounce } from 'lodash';

export default {
  name: "SearchDesign",
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    emitSearch: debounce(function () {
      this.$emit('searchDesign', this.searchQuery);
    }, 300)
  }
};
</script>

<template>
  <div class="search-input-container">
    <i class="material-icons search-icon">search</i>
    <input v-model="searchQuery" @input="emitSearch" placeholder="Search Users by Name, Email or Date" />
  </div>
</template>
