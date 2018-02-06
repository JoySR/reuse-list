<template>
  <div>
    <header-component />
    {{ path }}
  </div>
</template>
<script>
import HeaderComponent from '../components/partial/Header';

export default {
  name: 'ListView',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      path: this.$route.name,
    };
  },
};
</script>
