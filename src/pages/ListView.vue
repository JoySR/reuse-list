<template>
  <div>
    <header-component />
    <ul v-for="(list, index) in lists" :key="index">
      <li>{{ list.name }}</li>
    </ul>
    <modal-add-list />
    <modal-add-item />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '../components/partial/Header';
import ModalAddList from '../containers/ModalAddList';
import ModalAddItem from '../containers/ModalAddItem';

export default {
  name: 'ListView',
  components: {
    HeaderComponent,
    ModalAddList,
    ModalAddItem,
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
