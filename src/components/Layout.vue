<template>
  <div class="container">
    <header-component></header-component>
    <main>
      <slot></slot>
    </main>
    <footer-component></footer-component>
  </div>
</template>
<script>
import HeaderComponent from './partial/Header';
import FooterComponent from './partial/Footer';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
