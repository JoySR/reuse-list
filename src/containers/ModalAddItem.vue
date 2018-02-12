<template>
  <modal
    title="Add Item"
    :shown="shown"
    :enabledSubmit="!!value"
    @on-submit="submitAddItem"
    @on-close="closeModal"
  >
    <p>
      <label for="modal-create">New Item:</label>
      <input id="modal-create" type="text" v-model="value" />
    </p>
    <p>
      <label for="modal-create-in">In which List?</label>
      <select id="modal-create-in" v-model="inList">
        <option
          v-for="list in lists"
          :key="list.id"
          :value="list.id"
        >{{ list.name }}</option>
      </select>
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
      inList: '',
    };
  },
  computed: {
    ...mapGetters({
      shown: 'shownModalAddItem',
      lists: 'allLists',
    }),
  },
  methods: {
    submitAddItem() {
      this.closeModal();
    },
    closeModal() {
      this.$store.dispatch(
        'setModalAddItem',
        { shown: false },
      );
    },
  },
};
</script>
