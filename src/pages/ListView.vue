<template>
  <div>
    <header-component />
    <ul>
      <!-- FIXME: add notes for users that double click is possible. -->
      <li
        v-for="list in lists"
        :key="list.id"
        @dblclick="activeEdit(list.name)"
      >
        <input
          v-if="editing"
          title="edit list"
          type="text"
          v-model="editingName"
        />
        <button v-if="editing" @click="confirmEdit(list.id)">Confirm</button>
        <button v-if="editing" @click="cancelEdit">Cancel</button>
        <span v-else>{{ list.name }}</span>
        <button @click="removeList(list.id)">Remove</button>
      </li>
    </ul>
    <modal-add-list />
    <modal-add-item />
    <modal
      title="Remove List"
      :shown="shownModalRemoveList"
      :enabled-submit="true"
      @on-submit="confirmRemoveList"
      @on-close="cancelRemoveList"
    >
      <p>This list will be permanently removed. Are you sure to continue?</p>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import HeaderComponent from '../components/partial/Header';
import ModalAddList from '../containers/ModalAddList';
import ModalAddItem from '../containers/ModalAddItem';
import Modal from '../components/Modal';

export default {
  name: 'ListView',
  components: {
    HeaderComponent,
    ModalAddList,
    ModalAddItem,
    Modal,
  },
  data() {
    return {
      editing: false,
      editingName: '',
      shownModalRemoveList: false,
      toRemoveId: '',
      path: this.$route.name,
    };
  },
  computed: {
    ...mapGetters({
      lists: 'allLists',
    }),
  },
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.$store.dispatch('fetchLists');
    },
    activeEdit(name) {
      if (this.editing) return;
      this.editing = true;
      this.editingName = name;
    },
    confirmEdit(id) {
      this.$store.dispatch(
        'editList',
        {
          id,
          name: this.editingName,
        },
      ).then((response) => {
        // TODO
        if (response.data.name && response.data.name === this.editingName) {
          this.getLists();
        }
        // TODO: else?
        this.cancelEdit();
        // FIXME: temp disable lint
        // eslint-disable-next-line
      }).catch((error) => {
        // TODO: show error message, use a message component.
        this.cancelEdit();
      });
    },
    cancelEdit() {
      this.editing = false;
      this.editingName = '';
    },
    removeList(id) {
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
          this.getLists();
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
  },
};
</script>
