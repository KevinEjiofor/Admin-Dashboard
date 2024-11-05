<script>
import './UserTableStyles.css';
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/users';
import StatusTabs from '../statusTabs/StatusTabs.vue';
import UserRow from '../userRow/UserRow.vue';
import FilterButton from "../filter/Filter.vue";
import SearchDesign from "../search/SearchDesign.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Make sure you import this if needed

export default {
  components: { SearchDesign, FilterButton, StatusTabs, UserRow, FontAwesomeIcon },

  setup() {
    const userStore = useUserStore();
    const currentStatus = ref('All');
    const searchQuery = ref('');
    const selectedUsers = ref([]);

    const filteredAndSearchedUsers = computed(() => userStore.filteredAndSearchedUsers);

    // Check if all users are selected
    const allSelected = computed(() => {
      return filteredAndSearchedUsers.value.length > 0 &&
          selectedUsers.value.length === filteredAndSearchedUsers.value.length;
    });

    const updateStatus = (status) => {
      currentStatus.value = status;
      userStore.filterByStatus(status);
    };

    const markUserAsPaid = (userId) => {
      userStore.markAsPaid(userId);
    };

    const onSearchDesign = (query) => {
      searchQuery.value = query;
      userStore.searchUsers(query);
    };

    const toggleSelectUser = (userId) => {
      if (selectedUsers.value.includes(userId)) {
        selectedUsers.value = selectedUsers.value.filter(id => id !== userId);
      } else {
        selectedUsers.value.push(userId);
      }
    };

    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedUsers.value = [];
      } else {
        selectedUsers.value = filteredAndSearchedUsers.value.map(user => user.id);
      }
    };

    const toggleOptions = () => {
      // Handle the options dropdown or any action
      console.log('Toggle options clicked');
    };

    return {
      currentStatus,
      filteredAndSearchedUsers,
      totalPayableAmount: computed(() => userStore.calculateTotalPayable),
      allSelected,
      updateStatus,
      markUserAsPaid,
      onSearchDesign,
      toggleSelectUser,
      toggleSelectAll,
      toggleOptions,
      selectedUsers
    };
  }
}
</script>

<template>
  <div class="mainDiv">
    <h2 class="topH2">Table Heading</h2>

    <div class="statusTab">
      <StatusTabs :currentStatus="currentStatus" @updateStatus="updateStatus" />
      <p class="total">Total payable amount: <span class="amount">${{ totalPayableAmount }}.00</span> <span class="dollar">USD</span></p>

    </div>
    <div class="custom-divider-div">
      <hr class="custom-divider" />
    </div>

    <div class="secondDiv">
      <div class="custom-divider-div2">
        <hr class="custom-divider2" />
      </div>
      <div class="vertical-line"></div>
      <div class="searchDiv">

        <div class="filter-container">
          <FilterButton @filterSelected="onFilterSelected" />
          <SearchDesign @searchDesign="onSearchDesign" />
        </div>
        <button class="payDuesButton">Pay Dues</button>

      </div>
      <div class="vertical-line2"></div>

      <table>
        <thead>
        <tr class="header-row">
          <th><input type="checkbox" :checked="allSelected" @change="toggleSelectAll" /></th>
          <th></th>
          <th class="row">NAME</th>
          <th class="row">USER STATUS</th>
          <th class="row">PAYMENT STATUS</th>
          <th class="row">AMOUNT</th>
          <th class="icon-cell">
            <font-awesome-icon icon="ellipsis-v" @click="toggleOptions" style="cursor: pointer;" />
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-if="filteredAndSearchedUsers.length > 0">
          <UserRow
              v-for="user in filteredAndSearchedUsers"
              :key="user.id"
              :user="user"
              :isSelected="selectedUsers.includes(user.id)"
              @toggleSelect="toggleSelectUser(user.id)"
              @markAsPaid="markUserAsPaid"
          />
        </template>
        <template v-else>
          <tr><td colspan="6" class="no-records">No records found</td></tr>
        </template>
        </tbody>
      </table>

    </div>
  </div>
</template>
