<script>
export default {
  name: 'StatusTabs',
  props: ['currentStatus'],
};
import './StatusTabsStyle.css';
</script>

<template>
  <div class="tabs">
    <button
        :class="{ active: currentStatus === 'All' }"
        @click="$emit('updateStatus', 'All')"
    >
      All
    </button>
    <button
        :class="{ active: currentStatus === 'Paid' }"
        @click="$emit('updateStatus', 'Paid')"
    >
      Paid
    </button>
    <button
        :class="{ active: currentStatus === 'Unpaid' }"
        @click="$emit('updateStatus', 'Unpaid')"
    >
      Unpaid
    </button>
    <button
        :class="{ active: currentStatus === 'Overdue' }"
        @click="$emit('updateStatus', 'Overdue')"
    >
      Overdue
    </button>
  </div>
</template>



