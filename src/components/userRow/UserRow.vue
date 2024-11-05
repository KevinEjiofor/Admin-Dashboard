<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faEllipsisV,faCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './UserRowStyles.css';
import  DropDownComponent from '../dropDown/DropDown.vue'


library.add(faTimes, faEllipsisV,faCircle);

export default {
  components: { FontAwesomeIcon ,DropDownComponent},
  props: ['user', 'isSelected'],
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    markAsPaid(userId) {
      this.$emit('markAsPaid', userId);
    },
    toggleOptions() {
      this.showDropdown = !this.showDropdown;
    },
    handleAction(action) {
      console.log(`Selected action: ${action}`);
      this.showDropdown = false;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
  },
};
</script>

<template>
  <tr>

    <td>
      <input
          type="checkbox"
          :checked="isSelected"
          @change="$emit('toggleSelect')"
      />
    </td>
    <td>
      <DropDownComponent/>
    </td>
    <td>
      <div class="user-name">
        {{ user.firstName }} {{ user.lastName }}
      </div>
      <div class="user-email">{{ user.email }}</div>
    </td>
    <td>
      <div class="user-status-container">
        <div class="user-status" :class="{'active-status': user.userStatus === 'Active', 'inactive-status': user.userStatus === 'Inactive'}">
          <font-awesome-icon
              :icon="['fas', 'circle']"
              class="status-icon"
              :style="{ color: user.userStatus === 'Active' ? '#4A4AFF' : '#ffffff' }"
          />
          {{ user.userStatus }}
        </div>
        <div class="last-login">
          <span>Last login</span> {{ user.lastLogin }}
        </div>
      </div>
    </td>
    <td>
      <div class="user-status-container">

        <div
            class="user-status"
            :class="{
    'payment-status': user.paymentStatus === 'Paid',
    'unpaid-status': user.paymentStatus === 'Unpaid',
    'overdue-status': user.paymentStatus === 'OverDue'
  }"
        >
          <font-awesome-icon
              :icon="['fas', 'circle']"
              class="status-icon"
              :style="{
      color: user.paymentStatus === 'Paid' ? '#007F00' :
             user.paymentStatus === 'Unpaid' ? '#D30000' :
             user.paymentStatus === 'OverDue' ? '#007F00' : '#965E00'
    }"
          />
          {{ user.paymentStatus }}
        </div>
        <div class="last-login">
          <span v-if="user.paymentStatus === 'Paid'">Paid on</span>
          <span v-else>Due on</span>
          <span>{{ user.paymentStatus === 'Paid' ? user.paymentDate : user.paymentDueDate }}</span>
        </div>


      </div>

    </td>
    <td>
      <div class="user-name">
        {{ user.amount }}
      </div>
      <div class="user-email"><span>
        USD
      </span></div>
    </td>
    <td class="icon-cell">
      <span class="viewMore">
        view more
      </span>
      <font-awesome-icon
          icon="ellipsis-v"
          @click="toggleOptions"
          style="color: #8B83BA; cursor: pointer;"
      />
      <div v-if="showDropdown" class="dropdown-menu">

        <span class="close-icon" @click="closeDropdown">

          <font-awesome-icon icon="times" class="cancel" />
        </span>

        <p class="editButton" @click="handleAction('Edit')">Edit</p>
        <p class="viewProfileButton" @click="handleAction('View Profile')">View Profile</p>
        <p class="activateUserButton" @click="handleAction('Activate User')">Activate User</p>
        <hr class="custom-divider" />
        <p class="deleteButton" @click="handleAction('Delete')">Delete</p>
      </div>
    </td>
  </tr>
</template>

