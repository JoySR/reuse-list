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
import { login } from '../utils/api';

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
      const that = this;
      login(
        this.username,
        this.password,
        (error) => {
          if (error) {
            // TODO: more possibility.
            // error is an Object.
            if (error.toString().includes('403')) {
              this.errMsg = '用户名或密码不正确，请重试。';
            }
          } else {
            that.$router.push('/');
          }
        },
      );
    },
  },
};
</script>
