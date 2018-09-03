<template>
  <modal
    title="Add List"
    :shown="shown"
    :enabledSubmit="!!value"
    @on-submit="submitAddList"
    @on-close="closeModal"
  >
    <p>
      <label for="modal-create--list">New List:</label>
      <input id="modal-create--list" type="text" v-model="value" />
    </p>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import Modal from '../components/Modal';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    ...mapGetters({
      shown: 'shownModalAddList',
    }),
  },
  methods: {
    createList() {
      this.$store.dispatch(
        'createList',
        { name: this.value },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          if (this.$route.path === '/') {
            this.$store.dispatch('fetchLists');
          } else {
            this.$router.push('/');
          }
          this.resetModal();
        }
        // FIXME: add error handling
        // FIXME: temp disable lint
        // eslint-disable-next-line
      }).catch((error) => {
        // TODO: show error message, use a message component.
      });
    },
    submitAddList() {
      this.createList();
      this.closeModal();
    },
    cancelModal() {
      this.closeModal();
      this.resetModal();
    },
    closeModal() {
      this.$store.dispatch(
        'setModalAddList',
        { shown: false },
      );
    },
    resetModal() {
      this.value = '';
    },
  },
};
</script>
