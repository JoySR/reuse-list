<template>
  <div>
    <header-component />
    <ul v-for="(list, index) in lists" :key="index">
      <li>{{ list.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '../components/partial/Header';

export default {
  name: 'ListView',
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
      lists: 'allLists',
    }),
  },
  mounted() {
    this.$store.dispatch('fetchLists');
  },
};
</script>
