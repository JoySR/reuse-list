<template>
  <layout>
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
  </layout>
</template>
<script>
import { mapGetters } from 'vuex';
import { getLists } from '../utils/utilities';
import Layout from '../components/Layout';
import Lists from '../components/Lists';
import Modal from '../components/Modal';

export default {
  name: 'ListView',
  components: {
    Layout,
    Lists,
    Modal,
  },
  data() {
    return {
      shownModalRemoveList: false,
      toRemoveId: '',
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
        const data = response.data;
        if (data.status) {
          getLists();
        }
        // FIXME: add error handling
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
  },
};
</script>
