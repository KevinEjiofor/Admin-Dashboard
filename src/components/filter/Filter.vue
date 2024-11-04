<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilter, faCircle } from '@fortawesome/free-solid-svg-icons';
import './FilterStyle.css';
import { ref } from 'vue';
import { useUserStore } from '@/store/users';

export default {
  name: "FilterCon",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const showDropdown = ref(false);
    const userStore = useUserStore();
    const selectedItem = ref(null);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const sortUsers = (key) => {
      userStore.sortUsersBy(key);
      selectedItem.value = key;
      showDropdown.value = false;
    };

    const filterByStatus = (status) => {
      userStore.filterByStatus(status);
      selectedItem.value = status;
      showDropdown.value = false;
    };

    return {
      showDropdown,
      toggleDropdown,
      sortUsers,
      filterByStatus,
      selectedItem,
      faFilter,
      faCircle,
    };
  },
};
</script>
<template>
  <div class="filterDiv">
    <button @click="toggleDropdown" class="filterButton">
      <FontAwesomeIcon :icon="faFilter" class="filterIcon" />
      Filter
    </button>
    <div v-if="showDropdown" class="dropdownMenu">
      <h4>Sort By</h4>
      <ul>
        <li @click="sortUsers('firstName')">
          First Name
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'firstName'}"
              class="circleIcon"
          />
        </li>
        <li @click="sortUsers('lastName')">
          Last Name
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'lastName'}"
              class="circleIcon"
          />
        </li>
        <li @click="sortUsers('paymentDueDate')">
          Due Date
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'paymentDueDate'}"
              class="circleIcon"
          />
        </li>
        <li @click="sortUsers('lastLogin')">
          Last Login
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'lastLogin'}"
              class="circleIcon"
          />
        </li>
      </ul>
      <h4>Filter Users</h4>
      <ul>
        <li @click="filterByStatus('All')">
          All
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'All'}"
              class="circleIcon"
          />
        </li>
        <li @click="filterByStatus('Active')">
          Active
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'Active'}"
              class="circleIcon"
          />
        </li>
        <li @click="filterByStatus('Inactive')">
          Inactive
          <FontAwesomeIcon
              :icon="faCircle"
              :class="{'selected-icon': selectedItem === 'Inactive'}"
              class="circleIcon"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
