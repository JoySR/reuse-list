<template>
  <modal
    title="Add Item"
    :shown="shown"
    :enabledSubmit="!!value"
    @on-submit="submitAddItem"
    @on-close="cancelModal"
  >
    <p>
      <label for="modal-create--item">New Item:</label>
      <input id="modal-create--item" type="text" v-model="value" />
    </p>
    <p>
      <label for="modal-create-in">In which List?</label>
      <select
        id="modal-create-in"
        v-model="selectedList"
      >
        <option
          v-for="list in lists"
          :key="list.id"
          :value="list.id"
        >
          {{ list.name }}
        </option>
      </select>
    </p>
  </modal>
</template>
<script>
import { mapGetters } from 'vuex';
import Modal from '../components/Modal';
import { getCurrentListItems } from '../utils/utilities';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      selectedList: '',
      value: '',
    };
  },
  computed: {
    ...mapGetters({
      shown: 'shownModalAddItem',
      lists: 'allLists',
    }),
  },
  watch: {
    lists() {
      this.resetSelectedList();
    },
  },
  methods: {
    createItem() {
      this.$store.dispatch(
        'createItem',
        {
          name: this.value,
          listId: this.selectedList,
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          if (this.$route.path === `/list/${this.selectedList}/items`) {
            getCurrentListItems(this.selectedList);
          } else {
            this.$router.push(`/list/${this.selectedList}/items`);
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
    cancelModal() {
      this.closeModal();
      this.resetModal();
    },
    submitAddItem() {
      this.closeModal();
      this.createItem();
    },
    resetSelectedList() {
      this.selectedList = this.lists.length ? (this.lists)[0].id : '';
    },
    resetModal() {
      this.value = '';
      this.resetSelectedList();
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
