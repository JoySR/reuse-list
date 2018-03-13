<template>
  <div>
    <header-component />
    <items
      :items="items"
      @on-modal-remove-item-control="onModalRemoveItemControl"
    />
    <modal
      title="Remove Item"
      :shown="shownModalRemoveItem"
      :enabled-submit="true"
      @on-submit="confirmRemoveItem"
      @on-close="cancelRemoveItem"
    >
      <p>This item will be permanently removed. Are you sure to continue?</p>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getCurrentListItems } from '../utils/utilities';
import HeaderComponent from '../components/partial/Header';
import Items from '../components/Items';
import Modal from '../components/Modal';

export default {
  name: 'ItemView',
  components: {
    HeaderComponent,
    Items,
    Modal,
  },
  data() {
    return {
      listId: this.$route.params.id,
      shownModalRemoveItem: false,
      toRemoveId: '',
    };
  },
  computed: {
    ...mapGetters({
      items: 'currentListItems',
    }),
  },
  mounted() {
    getCurrentListItems(this.listId);
  },
  methods: {
    onModalRemoveItemControl({ id }) {
      this.toRemoveId = id;
      this.shownModalRemoveItem = true;
    },
    confirmRemoveItem() {
      // TODO: show msg for process
      this.shownModalRemoveItem = false;
      this.$store.dispatch(
        'removeItem',
        {
          id: this.toRemoveId,
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          getCurrentListItems(this.listId);
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
    cancelRemoveItem() {
      this.toRemoveId = '';
      this.shownModalRemoveItem = false;
    },
  },
};
</script>
