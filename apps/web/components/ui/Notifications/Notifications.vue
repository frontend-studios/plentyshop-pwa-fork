<template>
  <div data-testid="notifications" class="fixed w-50 right-2 top-2 max-w-[600px] z-[51]">
    <div v-for="notification of notifications" class="my-2" :key="notification.id">
      <Component :notification="notification" :is="getNotificationComponentByType(notification.type)"></Component>
    </div>
  </div>
</template>
<script setup lang="ts">
import NegativeNotification from './NegativeNotification/NegativeNotification.vue';
import NeutralNotification from './NeutralNotification/NeutralNotification.vue';
import PositiveNotification from './PositiveNotification/PositiveNotification.vue';
import SecondaryNotification from './SecondaryNotification/SecondaryNotification.vue';
import WarningNotification from './WarningNotification/WarningNotification.vue';

const { data: notifications } = useNotification();
const getNotificationComponentByType = (type: string) => {
  switch (type) {
    case 'positive': {
      return PositiveNotification;
    }
    case 'negative': {
      return NegativeNotification;
    }
    case 'secondary': {
      return SecondaryNotification;
    }
    case 'neutral': {
      return NeutralNotification;
    }
    case 'warning': {
      return WarningNotification;
    }
    default: {
      return PositiveNotification;
    }
  }
};
</script>
