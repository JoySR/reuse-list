<template>
  <div>
    <header-component />
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.title.rendered }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getCurrentListItems } from '../utils/common';
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
      items: 'currentListItems',
    }),
  },
  mounted() {
    this.getCurrentListItems();
  },
  methods: {
    getCurrentListItems() {
      const id = this.$route.params.id;
      getCurrentListItems(id);
    },
  },
};
</script>
