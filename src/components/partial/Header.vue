<template>
  <div class="header">
    <div class="site-title">
      <!-- TODO: Logo(/favicon) -->
      <p>{{ title }}</p>
    </div>
    <div class="site-search">
       <input
         type="text"
         title="Search for list or item"
         v-model="keyword"
       />
      <button @click="searchAll">Search</button>
    </div>
    <div class="admin-area">
      <!-- TODO: 大屏则分开两个添加 (list, item) 和 admin，小屏则放到下拉菜单 -->
      <button v-if="token" @click="openModalAddList">Add List</button>
      <button v-if="token" @click="openModalAddItem">Add Item</button>
      <button v-if="token" @click="logOut">Log Out</button>
      <router-link v-else :to="logInPath">Log In</router-link>
    </div>
    <modal-add-list />
    <modal-add-item />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getLists } from '../../utils/common';
import COMMON from '../../utils/config';
import ModalAddList from '../../containers/ModalAddList';
import ModalAddItem from '../../containers/ModalAddItem';

export default {
  components: {
    ModalAddList,
    ModalAddItem,
  },
  data() {
    return {
      title: COMMON.TITLE,
      logInPath: { name: 'Login' },
      keyword: '',
    };
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
    }),
  },
  mounted() {
    getLists();
  },
  methods: {
    logOut() {
      this.$store.dispatch('clearToken');
    },
    searchAll() {
      this.$store.dispatch(
        'searchAll',
        { keyword: this.keyword },
      ).then(() => {
        this.keyword = '';
      });
    },
    openModalAddList() {
      this.$store.dispatch(
        'setModalAddList',
        { shown: true },
      );
    },
    openModalAddItem() {
      this.$store.dispatch(
        'setModalAddItem',
        { shown: true },
      );
    },
  },
};
</script>
<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
