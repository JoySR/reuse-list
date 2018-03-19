<template>
  <div class="header">
    <div class="site-title">
      <!-- TODO: Logo(/favicon) -->
      <router-link to="/">{{ title }}</router-link>
    </div>
    <div class="site-search">
       <input
         type="text"
         title="Search for list or item"
         v-model="keyword"
       />
      <button @click="searchAll">Search</button>
    </div>
    <div v-if="token" class="admin-area">
      <!-- TODO: 大屏则分开两个添加 (list, item) 和 admin，小屏则放到下拉菜单 -->
      <button @click="openModalAddList">Add List</button>
      <button @click="openModalAddItem">Add Item</button>
      <button @click="logOut">Log Out</button>
    </div>
    <div class="admin-area" v-else>
      <router-link :to="logInPath">Log In</router-link>
      <router-link :to="registerPath">Register</router-link>
    </div>
    <modal-add-list />
    <modal-add-item />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getLists } from '../../utils/utilities';
import COMMON from '../../config/config';
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
      registerPath: { name: 'Register' },
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
      this.$store.dispatch('clearToken', {
        username: localStorage.getItem('username'),
      }).then(() => {
        // TODO: use message component to show msg.
      }).catch(() => {
        // TODO: show error message, use a message component.
      });
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
