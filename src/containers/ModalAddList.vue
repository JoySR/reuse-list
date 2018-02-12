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
    submitAddList() {
      this.$store.dispatch(
        'createList',
        { name: this.value },
      ).then((response) => {
        if (response.data.name && response.data.name === this.value) {
          this.$store.dispatch('fetchLists');
        }
        // TODO: else?
        // FIXME: temp disable lint
        // eslint-disable-next-line
      }).catch((error) => {
        // TODO: show error message, use a message component.
      });
      this.closeModal();
    },
    closeModal() {
      this.$store.dispatch(
        'setModalAddList',
        { shown: false },
      );
    },
  },
};
</script>
