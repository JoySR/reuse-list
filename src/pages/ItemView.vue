<template>
  <div>
    <header-component />
    <ul v-for="(item, index) in items" :key="index">
      <li>{{ item.title.rendered }}</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '../components/partial/Header';

export default {
  name: 'ItemView',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      path: this.$route.name,
    };
  },
  computed: {
    ...mapGetters({
      items: 'allItems',
    }),
  },
  mounted() {
    this.$store.dispatch('fetchAllItems');
  },
};
</script>
