<script>
import './UserTableStyles.css';
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/users';
import StatusTabs from '../statusTabs/StatusTabs.vue';
import UserRow from '../userRow/UserRow.vue';
import FilterButton from "../filter/Filter.vue";
import SearchDesign from "../search/SearchDesign.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faChevronRight, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default {
  components: { SearchDesign, FilterButton, StatusTabs, UserRow, FontAwesomeIcon },
  setup() {
    const userStore = useUserStore();
    const currentStatus = ref('All');
    const searchQuery = ref('');
    const selectedUsers = ref([]);
    const currentPage = ref(1); // Track the current page
    const rowsPerPage = ref(10); // Number of rows per page

    const filteredAndSearchedUsers = computed(() => userStore.filteredAndSearchedUsers);

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return filteredAndSearchedUsers.value.slice(start, end);
    });

    const startRow = computed(() => (currentPage.value - 1) * rowsPerPage.value + 1);
    const endRow = computed(() => {
      const end = currentPage.value * rowsPerPage.value;
      return end > filteredAndSearchedUsers.value.length ? filteredAndSearchedUsers.value.length : end;
    });
    const totalRows = computed(() => filteredAndSearchedUsers.value.length);

    const allSelected = computed(() => {
      return paginatedUsers.value.length > 0 &&
          selectedUsers.value.length === paginatedUsers.value.length;
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
        selectedUsers.value = paginatedUsers.value.map(user => user.id);
      }
    };

    const toggleOptions = () => {
      console.log('Toggle options clicked');
    };

    const nextPage = () => {
      if (currentPage.value * rowsPerPage.value < filteredAndSearchedUsers.value.length) {
        currentPage.value += 1;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const sortBy = (column) => {
      userStore.sortUsersBy(column);
    };

    const sortIcon = (column) => {
      if (userStore.sortKey === column) {
        return userStore.sortOrder === 'asc' ? faArrowDown : faArrowUp;
      }
      return faArrowDown; // Default icon
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
      selectedUsers,
      paginatedUsers,
      rowsPerPage,
      currentPage,
      nextPage,
      previousPage,
      startRow,
      endRow,
      totalRows,
      sortBy,
      sortIcon,
      faChevronLeft,
      faChevronRight
    };
  }
};
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
          <th class="row" @click="sortBy('firstName')">NAME</th>
          <th class="row" @click="sortBy('userStatus')">USER STATUS</th>
          <th class="row" @click="sortBy('paymentStatus')">PAYMENT STATUS</th>
          <th class="row" @click="sortBy('amount')">AMOUNT</th>
          <th class="icon-cell">
            <font-awesome-icon icon="ellipsis-v" @click="toggleOptions" style="cursor: pointer;" />
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-if="paginatedUsers.length > 0">
          <UserRow
              v-for="user in paginatedUsers"
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
      <div class="pagination-controls">
        <div class="counterDiv">
          <label>Rows per page:</label>
          <select v-model="rowsPerPage">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="30">30</option>
          </select>
        </div>
        <div class="counterDiv">
          <span>{{ startRow }} to {{ endRow }} of {{ totalRows }}</span>
        </div>
        <div class="nextDIv">
          <button @click="previousPage" :disabled="currentPage === 1">
            <font-awesome-icon :icon="faChevronLeft" />
          </button>
          <button @click="nextPage" :disabled="currentPage * rowsPerPage >= filteredAndSearchedUsers.length">
            <font-awesome-icon :icon="faChevronRight" />
          </button>
        </div>
      </div>
      <div class="custom-divider-div3">
        <hr class="custom-divider" />
      </div>
    </div>
  </div>
</template>
