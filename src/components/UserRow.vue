<template>
  <tr>
    <td>{{ user.firstName  }}  {{ user.lastName }}  {{user.email}}</td>

    <td>{{ user.paymentStatus }}</td>
    <td>{{user.amount}}</td>

    <td>
      <input
          type="checkbox"
          v-if="user.status === 'Unpaid' || user.status === 'Overdue'"
          @change="markAsPaid(user.id)"
      />
    </td>
  </tr>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    markAsPaid(userId) {
      this.$emit('markAsPaid', userId);
    }
  }
};
</script>
