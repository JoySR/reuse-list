<template>
  <div>{{ path }}</div>
</template>
<script>
export default {
  name: 'ListView',
  data() {
    return {
      path: this.$route.name,
    };
  },
};
</script>
