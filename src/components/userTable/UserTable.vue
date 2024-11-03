<script>
import './UserTableStyles.css';
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/users';
import StatusTabs from '../statusTabs/StatusTabs.vue';
import UserRow from '../UserRow.vue';

export default {
  components: { StatusTabs, UserRow },

  setup() {
    const userStore = useUserStore();
    const currentStatus = ref('All');
    const searchQuery = ref('');

    const filteredAndSearchedUsers = computed(() => {
      const users = userStore.filteredUsers(currentStatus.value);
      if (!searchQuery.value) return users;
      return users.filter(user =>
          user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const updateStatus = (status) => {
      currentStatus.value = status;
    };

    const markUserAsPaid = (userId) => {
      userStore.markAsPaid(userId);
    };

    return {
      currentStatus,
      searchQuery,
      filteredAndSearchedUsers,
      totalPayableAmount: computed(() => userStore.calculateTotalPayable), // Use computed
      updateStatus,
      markUserAsPaid
    };
  }
}
</script>

<template>
  <div class="mainDiv">
    <h2 class="topH2">Table Heading</h2>

    <div class="statusTab">
      <StatusTabs :currentStatus="currentStatus" @updateStatus="updateStatus" />
      <p class="total">Total payable amount: <span class="amount"> ${{totalPayableAmount }}.00</span> <span class="dollar">USD</span></p>

    </div>
    <hr class="custom-divider" />


    <div class="secondDiv">
      <div class="searchDiv">
        <input v-model="searchQuery" placeholder="Search User by Name, Email or email..." />
      </div>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Amount Due</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <UserRow
            v-for="user in filteredAndSearchedUsers"
            :key="user.id"
            :user="user"
            @markAsPaid="markUserAsPaid"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>
