<template>
  <div>
    {{ path }}
    <p v-if="token">Logged in.</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  data() {
    return {
      path: this.$route.name,
    };
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
    }),
  },
};
</script>
