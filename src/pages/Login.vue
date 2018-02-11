<template>
  <div>
    <p>{{ errMsg }}</p>
    <p>
      <label for="username">Username:</label>
      <input id="username" v-model="username" />
    </p>
    <p>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" />
    </p>
    <p>
      <button
        @click="submit"
      >Submit</button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errMsg: '',
    };
  },
  methods: {
    submit() {
      if (this.username === '' || this.password === '') return;
      this.$store.dispatch('setJwtToken', {
        username: this.username,
        password: this.password,
      }).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        // TODO: more possibility.
        // error is an Object.
        if (error.toString().includes('403')) {
          this.errMsg = '用户名或密码不正确，请重试。';
        }
      });
    },
  },
};
</script>
