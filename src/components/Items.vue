<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <span v-if="editing && editingId === item.id">
        <input
          title="Edit item"
          type="text"
          v-model="editingName"
        />
        <button @click="confirmEdit">Confirm</button>
        <button @click="cancelEdit">Cancel</button>
      </span>
      <span v-else>
        <input type="checkbox">
        <span
          @dblclick="editItem(item)"
        >{{ item.title.rendered }}</span>
      </span>
      <button @click="removeItem(item.id)">Remove</button>
    </li>
  </ul>
</template>
<script>
import { getCurrentListItems } from '../utils/common';

export default {
  name: 'Items',
  data() {
    return {
      listId: this.$route.params.id,
      editing: false,
      editingId: '',
      editingName: '',
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    editItem(item) {
      this.editingId = item.id;
      this.editingName = item.title.rendered;
      this.editing = true;
    },
    confirmEdit() {
      this.$store.dispatch(
        'editItem',
        {
          id: this.editingId,
          name: this.editingName,
        },
      ).then((response) => {
        // TODO
        if (response.data.title && response.data.title.raw === this.editingName) {
          getCurrentListItems(this.listId);
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
      this.editingId = '';
      this.editingName = '';
    },
    removeItem(id) {
      this.$emit('on-modal-remove-item-control', { id });
    },
  },
};
</script>
