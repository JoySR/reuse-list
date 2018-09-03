<template>
  <ul>
    <li
      v-for="list in lists"
      :key="list.id"
    >
      <span v-if="editing && editingId === list.id">
        <input
          title="Edit list"
          type="text"
          v-model="editingName"
        />
        <button @click="confirmEdit">Confirm</button>
        <button @click="cancelEdit">Cancel</button>
      </span>
      <span v-else>
        <span
          @click="openItemView(list.id)"
        >{{ list.name }}</span>
        <button v-if="token" @click="activeEdit(list.id, list.name)">Edit</button>
      </span>
      <button v-if="token" @click="removeList(list.id)">Remove</button>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex';
import { getLists } from '../utils/utilities';

export default {
  data() {
    return {
      editing: false,
      editingId: '',
      editingName: '',
    };
  },
  props: {
    lists: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
    }),
  },
  methods: {
    openItemView(id) {
      this.$router.push(`/list/${id}/items`);
    },
    activeEdit(id, name) {
      if (this.editing) return;
      this.editing = true;
      this.editingId = id;
      this.editingName = name;
    },
    confirmEdit() {
      this.$store.dispatch(
        'editList',
        {
          id: this.editingId,
          name: this.editingName,
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          getLists();
        }
        // FIXME: add error handling
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
      this.editingId = '';
      this.editingName = '';
    },
    removeList(id) {
      this.$emit('on-modal-remove-list-control', { id });
    },
  },
};
</script>
