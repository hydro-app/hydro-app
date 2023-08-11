<template>
  <h1>Login</h1>

  <div class="text-center">
    <div class="spinner-border text-primary" role="status" v-if="status == 'loading'">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div class="alert alert-danger" v-else-if="status == 'error'">
      Login failed
    </div>

    <div class="" v-else>
    </div>
  </div>

  <form @submit.prevent="login" class="flex flex-col">
    <input type="text" placeholder="Username" v-model="username" autofocus class="form-control form-control-lg my-3"/>
    <input type="password" placeholder="Password" v-model="password" class="form-control form-control-lg my-3"/>


    <span class="btn btn-primary btn-lg disabled" v-if="status == 'loading'">
      <span class="spinner-border text-white" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    </span>

    <span class="btn btn-danger btn-lg disabled" v-else-if="status == 'error'">failed</span>
    <button type="submit" class="btn btn-primary btn-lg" v-else>Login</button>

  </form>
</template>

<script lang="ts" setup>

</script>

<script lang="ts">
import router from '@/router'
import {defineComponent} from "vue";
import {userStore} from '@/stores/user'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      status: '',
    }
  },
  methods: {
    async login() {
      this.status = 'loading'
      const user = userStore()
      await user.login(this.username, this.password)
      if (user.is_authenticated())
        await router.push({name: 'hydroView'})
      else {
        this.status = 'error'
        setTimeout(() => {
          this.status = ''
        }, 2000);
      }

    },
  },
})
</script>

