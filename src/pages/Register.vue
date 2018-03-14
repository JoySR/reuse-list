<template>
  <form>
    <p>{{ errMsg }}</p>
    <p>
      <label for="username">Username(required):</label>
      <input type="text" id="username" v-model="username" required />
    </p>
    <p>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
    </p>
    <p>
      <label for="password">Password(required):</label>
      <input id="password" type="password" v-model="password" required />
    </p>
    <p>
      <label for="password-repeat">Confirm Password(required):</label>
      <input id="password-repeat" type="password" v-model="passwordRepeat" required />
    </p>
    <p>
      <button
        @click.prevent="submit"
      >Submit</button>
    </p>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      errMsg: '',
    };
  },
  methods: {
    submit() {
      if (
        this.username === '' ||
        this.password === '' ||
        this.passwordRepeat === ''
      ) return;
      if (this.password !== this.passwordRepeat) {
        this.errMsg = '两次密码输入不相同，请输入一致的密码';
        return;
      }
      this.$store.dispatch('register', {
        username: this.username,
        password: this.password,
        // TODO: email is optional now, if 'forget password' feature done, it may be not optional.
        // TODO: Not everyone likes to share mail address. But no email, no find password back. :)
        email: this.email || 'default@example.com',
      }).then(() => {
        // TODO: message for successfully registered.
        this.$router.push('/login');
      }).catch((error) => {
        // FIXME: more specific.
        if (error) {
          this.errMsg = '注册失败，请重试';
        }
      });
    },
  },
};
</script>
