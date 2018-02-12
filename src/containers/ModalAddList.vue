<template>
  <modal
    title="Add List"
    :shown="shown"
    :enabledSubmit="!!value"
    @on-submit="submitAddList"
    @on-close="closeModal"
  >
    <p>
      <label for="modal-create">New List:</label>
      <input id="modal-create" type="text" v-model="value" />
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
