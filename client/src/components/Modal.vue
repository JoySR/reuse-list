<template>
  <div class="modal-container" v-if="shown">
    <div class="modal">
      <header>
        <span>{{ title }}</span>
        <span class="close-icon" @click="closeModal">X</span>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <button @click="submitModal">Submit</button>
        <button @click="closeModal">Close</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    shown: {
      type: Boolean,
      required: true,
      default: false,
    },
    enabledSubmit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    submitModal() {
      if (this.enabledSubmit) {
        this.$emit('on-submit');
      }
    },
    closeModal() {
      this.$emit('on-close');
    },
  },
};
</script>
<style scoped>
  .modal-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: #f3f3f3;
  }

  .modal header,
  .modal main,
  .modal footer {
    padding: 10px;
  }

  .modal header {
    display: flex;
    justify-content: space-between;
  }

  .modal .close-icon,
  .modal footer button {
    cursor: pointer;
  }
</style>
