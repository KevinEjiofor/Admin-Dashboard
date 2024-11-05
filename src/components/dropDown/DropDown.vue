<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './DropDownStyle.css';

library.add(faAngleDown, faInfoCircle);

export default {
  name: "DropDown",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      showDropdown: false,
      userActivities: [
        { date: "12/APR/2020", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", userActivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum." },
        { date: "08/APR/2020", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", userActivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum." },
        { date: "04/APR/2020", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", userActivity: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus, sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies suspendisse vestibulum." },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<template>
  <div>
    <div class="dropdown" @click="toggleDropdown">
      <font-awesome-icon
          :icon="['fas', 'angle-down']"
          :class="{ rotate: showDropdown }"
          class="dropdown-icon"
      />
    </div>

    <div v-if="showDropdown" class="dropdown-content">
      <table class="activity-table">
        <thead>
        <tr>
          <th>Date</th>
          <th>Detail   <font-awesome-icon icon="info-circle" class="info-icon" /></th>
          <th>User Activity</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="activity in userActivities"
            :key="activity.date"
            class="activity-row"
            :style="{ backgroundColor: showDropdown ? '#F2F0F9' : 'transparent' }"
        >
          <td>{{ activity.date }}</td>
          <td class="userActivity">{{ activity.userActivity }}</td>
          <td>{{ activity.detail }}</td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
