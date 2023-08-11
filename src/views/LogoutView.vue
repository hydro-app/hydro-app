<script lang="ts">
import router from '@/router'
import {defineComponent} from "vue";
import {userStore} from '@/stores/user'

export default defineComponent({
  name: 'logoutView',
  methods: {
    async logout() {
      const user = userStore()
      if (user.is_authenticated())
        await user.logout()
      await router.push({path: '/'})
    },
  },
})
</script>

<template>
  <h1>Logout</h1>
  <hr/>
  <p>Are you sure you want to logout?</p>
  <button v-on:click="logout()" class="btn btn-danger btn-lg">Logout</button>
</template>
