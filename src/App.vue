<script lang="ts" setup>
import svgBase from '@/components/svgBase.vue'
import moment from "moment";

import {RouterLink, RouterView} from 'vue-router'
import {watch} from 'vue'

import {settingsStore} from '@/stores/settings'
import {userStore} from '@/stores/user'
import {hydroStore} from '@/stores/hydro'

const appName = import.meta.env.VITE_APP_NAME

const user = userStore()
const hydro = hydroStore()
const settings = settingsStore()

settings.loadSettings()
settings.loadPresets()
hydro.init()

// simple reminder
let reminderTimeout: any

async function callReminder(seconds: number) {
  reminderTimeout = setTimeout(() => {
    new Notification("Hydration Time!");
    setReminder()
  }, seconds * 1000)
}

async function setReminder() {
  clearTimeout(reminderTimeout)

  let reminderSeconds = (settings.store.reminder.hours * 60 * 60)
      + (settings.store.reminder.minutes * 60)
      + settings.store.reminder.seconds

  let reminderAt = moment().add(reminderSeconds, 'seconds')
  const callReminderSeconds = reminderAt.diff(moment())/1000
  await callReminder(callReminderSeconds)
}

watch(
    () => [
      settings.store.reminder,
      settings.store.reminderActive,
      settings.store.startTime,
      settings.store.endTime,
      settings.store.reminder,
      hydro.lastEntryAt,
    ],
    () => {
      clearTimeout(reminderTimeout)

      if (settings.store.reminderActive) {
        setReminder()
      }
    },
)
</script>

<template>
  <svgBase/>
  <main class="container-sm">
    <div class="row">
      <div class="col">

        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">

            <RouterLink :to="{'name': 'hydroView'}" class="navbar-brand">
              {{ appName }}
            </RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav"></div>

              <div class="navbar-nav ms-auto">
                <RouterLink :to="{'name': 'settingsView'}" class="nav-link">
                  Settings
                </RouterLink>
                <RouterLink :to="{'name': 'loginView'}" class="nav-link" v-if="!user.token">
                  Login
                </RouterLink>
                <RouterLink :to="{'name': 'logoutView'}" class="nav-link" v-if="user.token">
                  Logout
                </RouterLink>
              </div>

            </div>
          </div>
        </nav>
        <div class="content justify-content-center py-2 px-1">
          <RouterView/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>