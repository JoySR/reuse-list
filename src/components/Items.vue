<template>
  <ul>
    <li v-for="item in items" :key="item.id">
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
        <input
          v-if="token"
          title="check/uncheck item"
          type="checkbox"
          :checked="+item.checked"
          @change="handleCheck(item, listId)"
        />
        <span
          :class="{
            admin: token,
            guest: !token,
            checked: !!(+item.checked)
          }"
          @dblclick="editItem(item)"
        >{{ item.name }}</span>
      </span>
      <button v-if="token" @click="removeItem(item.id)">Remove</button>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex';
import { handleCheck } from '../controllers/item';
import { getCurrentListItems } from '../utils/utilities';

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
  computed: {
    ...mapGetters({
      token: 'getToken',
    }),
  },
  methods: {
    handleCheck(item, listId) {
      handleCheck(item, listId);
    },
    editItem(item) {
      if (this.token) {
        this.editingId = item.id;
        this.editingName = item.name;
        this.editing = true;
      }
    },
    confirmEdit() {
      this.$store.dispatch(
        'editItem',
        {
          id: this.editingId,
          name: this.editingName,
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          getCurrentListItems(this.listId);
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
    removeItem(id) {
      this.$emit('on-modal-remove-item-control', { id });
    },
  },
};
</script>
<style scoped>
  .checked {
    text-decoration: line-through;
  }
</style>
