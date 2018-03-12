<template>
  <div>
    <header-component />
    <lists
      :lists="lists"
      @on-modal-remove-list-control="onModalRemoveListControl"
    />
    <modal
      title="Remove List"
      :shown="shownModalRemoveList"
      :enabled-submit="true"
      @on-submit="confirmRemoveList"
      @on-close="cancelRemoveList"
    >
      <p>This list will be permanently removed. Are you sure to continue?</p>
    </modal>
    <modal
      title="Welcome"
      :shown="showWelcome"
      :enabled-submit="true"
      @on-submit="closeWelcome"
      @on-close="closeWelcome"
    >
      <p>欢迎！</p>
      <p>项目还在开发中，样式开发尚未开始，所以界面非常不好看，还请耐心等待一阵子。</p>
      <p>原本使用的是自定制的 WordPress REST API，无奈局限性太多，索性用 PHP 重写了一遍接口，所以前端的开发停滞了几天。</p>
      <p>不过有了接口，剩下的就都是愉快的前端工作啦！自己非常期待呢！</p>
      <p>测试用账号 => 用户名：test，密码：test</p>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getLists } from '../utils/common';
import HeaderComponent from '../components/partial/Header';
import Lists from '../components/Lists';
import Modal from '../components/Modal';

export default {
  name: 'ListView',
  components: {
    HeaderComponent,
    Lists,
    Modal,
  },
  data() {
    return {
      shownModalRemoveList: false,
      toRemoveId: '',
      showWelcome: localStorage.getItem('first') !== '0',
    };
  },
  computed: {
    ...mapGetters({
      lists: 'allLists',
    }),
  },
  mounted() {
    getLists();
  },
  methods: {
    onModalRemoveListControl({ id }) {
      this.toRemoveId = id;
      this.shownModalRemoveList = true;
    },
    confirmRemoveList() {
      // TODO: show msg for process
      this.shownModalRemoveList = false;
      this.$store.dispatch(
        'removeList',
        {
          id: this.toRemoveId,
        },
      ).then((response) => {
        if (response.data.deleted && response.data.previous.id === this.toRemoveId) {
          getLists();
        }
        // TODO: else?
        this.toRemoveId = '';
        // FIXME: temp disable lint
        // eslint-disable-next-line
      }).catch((error) => {
        // TODO: show error message, use a message component.
        this.toRemoveId = '';
      });
    },
    cancelRemoveList() {
      this.toRemoveId = '';
      this.shownModalRemoveList = false;
    },
    closeWelcome() {
      this.showWelcome = false;
      localStorage.setItem('first', '0');
    },
  },
};
</script>
