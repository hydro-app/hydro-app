<script lang="ts" setup>
import {settingsStore} from '@/stores/settings'
import {toRaw} from "vue";

const settings = settingsStore()

const Colors = [
    'lightblue',
    'orange',
    'lime',
    'purple',
    'brown',
]
</script>

<script lang="ts">
import {defineComponent} from "vue";
import {db} from '@/stores/db'

export default defineComponent({
  name: 'SettingsView',
  data() {
    return {
      dev: import.meta.env.DEV,
      notifyPerm: Notification.permission,
      targetAmountChoices: [1500, 2000, 2500, 3000, 3500, 4000],
      reminderActive: true,
      startTime: {
        "hours": 7,
        "minutes": 0,
      },
      endTime: {
        "hours": 22,
        "minutes": 0,
      },
      reminder: {
        "hours": 0,
        "minutes": 30,
        "seconds": 0
      },
      presetIcon: 'glas',
      presetAmount: 100,
      presetColor: 'lightblue',
      presetFill: 80,
    }
  },
  methods: {
    clearDatabaseTable(table: string) {
      console.log("database table clear: " + table)
      db.table(table).clear()
    },
    requestPermissionNotify() {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("permissions granted")
        }
      });
    },
  },
})
</script>

<template>

  <div class="row">
    <div class="col">
      <h1>Settings</h1>
    </div>
    <div class="col text-end">
      <RouterLink :to="{'name': 'hydroView'}" class="btn btn-outline-secondary">
        X
      </RouterLink>
    </div>
  </div>

  <div class="card my-4">
    <div class="card-header">
      General
    </div>
    <div class="card-body">

      <div class="row py-3">
        <div class="col-4">
          <div class="dropdown mx-2">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
              {{ settings.store.targetAmount }}ml
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item"
                   v-for="amount in targetAmountChoices"
                   v-bind:key="amount"
                   v-on:click="settings.updateSettings('targetAmount', amount)">
                  {{ amount }}ml
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div class="col">
          Target Amount
        </div>
      </div>

      <div class="row py-3">
        <div class="col-4">
          <VueDatePicker v-model="settings.store.startTime"
                         @closed="settings.updateSettings('startTime', toRaw(settings.store.startTime))"
                         time-picker teleport-center auto-apply dark/>
        </div>
        <div class="col">
          Day Start Time
        </div>
      </div>

      <div class="row py-3">
        <div class="col-4">
          <VueDatePicker v-model="settings.store.endTime"
                         v-on:closed="settings.updateSettings('endTime', toRaw(settings.store.endTime))"
                         time-picker teleport-center auto-apply dark/>
        </div>
        <div class="col">
          Day End Time
        </div>
      </div>


    </div>
  </div>

  <div class="card my-4">
    <div class="card-header">
      Reminder
    </div>
    <div class="card-body">

      <div class="row py-3">
        <div class="col-4">
          <div class="form-check form-switch mx-2">
            <input class="form-check-input" type="checkbox"
                   v-model="settings.store.reminderActive"
                   v-on:change="settings.updateSettings('reminderActive', settings.store.reminderActive)">
          </div>
        </div>
        <div class="col">
          Enable Reminders
        </div>
      </div>

      <div class="row py-3">
        <div class="col-4">
          <VueDatePicker v-model="settings.store.reminder"
                         v-on:closed="settings.updateSettings('reminder', toRaw(settings.store.reminder))"
                         :min-time="{ hours: 0, minutes: 1 }" :max-time="{ hours: 6, minutes: 0 }"
                         time-picker teleport-center auto-apply dark/>
        </div>
        <div class="col">
          Remind Every
        </div>
      </div>

    </div>
  </div>


  <div class="card my-4">
    <div class="card-header">Presets</div>

    <div class="card-body">
      <div v-for="(preset, index) of settings.presets" v-bind:key="index" class="row py-2">
        <div class="col">
          <svgIcon :icon="preset.icon" :color="preset.color" :fill="preset.fill" :size="30" :stroke="3"/>
        </div>
        <div class="col">
          {{ preset.amount }}ml
        </div>
        <div class="col">
          {{ preset.icon }}
        </div>
        <div class="col text-end" v-if="preset.id">
          <button class="btn btn-danger" v-on:click="settings.deletePreset(preset.id)" v-if="preset.id">X</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card my-4">
    <div class="card-header">Create Preset</div>

    <div class="card-body">
      <div class="row py-4">
        <div class="col-md-6 text-center">
          <svgIcon :icon="presetIcon" :color="presetColor" :fill="presetFill" :size="100" :stroke="3"/>
          {{ presetAmount }}ml
        </div>
        <div class="col-md-6 text-center my-md-2">
          <button class="btn btn-primary"
                  v-on:click="settings.addPreset(presetIcon, presetAmount, presetColor, presetFill)">
            Add Preset
          </button>
        </div>
      </div>

      <hr/>

      <div class="row py-2">
        <div class="col-4">
          Amount
        </div>
        <div class="col">
          <input class="form-control" v-model="presetAmount" type="number"/>
        </div>
      </div>

      <div class="row py-2">
        <div class="col-4">
          Color
        </div>
        <div class="col">

          <label class="color-swatch" v-for="color in Colors" v-bind:key="color">
            <input v-model="presetColor" :value="color" type="radio" />
            <span :style="'background:' + color" />
          </label>

          <input class="form-control" v-model="presetColor" type="text"/>
        </div>
      </div>

      <div class="row py-3">
        <div class="col-4">
          Fill
        </div>
        <div class="col">
          <input class="form-control" v-model="presetFill" type="number"/>
        </div>
      </div>

      <div class="row py-3">
        <div class="col-4">
          Icon
        </div>
        <div class="col">
          <div class="form-check" v-for="(icon, index) in settings.presetIcons" v-bind:key="index">
            <input class="form-check-input" type="radio"
                   :name="'presetIcon-'+index"
                   :id="'presetIcon-'+index"
                   :value="icon"
                   v-model="presetIcon">
            <label class="form-check-label" :for="'presetIcon-'+index">
              <svgIcon :icon="icon" color="lightblue" :fill="100" :size="50" :stroke="3"/>
            </label>
          </div>
        </div>

      </div>
    </div>

  </div>

  <div class="card my-4" v-if="dev">
    <div class="card-header">Dev Actions</div>
    <div class="card-body">
      <a v-on:click="clearDatabaseTable('entries')" class="btn btn-danger m-1">Clear Hydro Database</a>
      <a v-on:click="clearDatabaseTable('settings')" class="btn btn-danger m-1">Clear Settings Database</a>
      <a v-on:click="clearDatabaseTable('presets')" class="btn btn-danger m-1">Clear Presets Database</a>
      <a v-on:click="requestPermissionNotify()" class="btn btn-primary m-1">Allow Notifications</a>
      <pre>
        time: {{ startTime }} - {{ endTime }}
        notifyPerm: {{ notifyPerm }}
        settings.store:
        {{ settings.store }}
      </pre>
    </div>
  </div>

</template>
