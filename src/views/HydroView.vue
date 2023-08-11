<script lang="ts" setup>
import moment from "moment";

import {ref} from 'vue'

import {settingsStore} from '@/stores/settings'
import {hydroStore} from '@/stores/hydro'

const settings = settingsStore()
const hydro = hydroStore()

let hydrationPercent = ref(0)

let hydrationTotal = () => {
  let total = 0
  for (const entry of hydro.entries) {
    total += entry.amount
  }
  const percent = total / (settings.store.targetAmount / 100)
  hydrationPercent.value = percent <= 100 ? parseInt(percent.toFixed()) : 100
  return total
}

</script>

<template>
  <div class="text-center">

    <svgIcon icon="glas" color="lightblue" :fill="hydrationPercent" :size="200" :stroke="3"/>
    <div class="py-2">
      <strong>{{ hydrationTotal() }}</strong>
      <span>/{{ settings.store.targetAmount }}</span>
      <span>({{ hydrationPercent }}%)</span>
    </div>

    <div class="py-4">
    <span class="btn btn-lg text-white m-2" v-for="(preset, index) in settings.presets" v-bind:key="index"
          v-on:click="hydro.addPresetEntry(settings.presets, index)">
      <svgIcon :icon="preset.icon" :color="preset.color" :fill="preset.fill" :size="30" :stroke="3"/>
      {{ preset.amount }} ml
    </span>
    </div>

    <ul class="pagination pagination-lg justify-content-center pointer">
      <li class="page-item">
        <a class="page-link"
           v-on:click="hydro.setDate(hydro.datePrevious)">&leftarrow;</a>
      </li>
      <li class="page-item active fw-bol col">
        <a class="page-link" v-if="hydro.isToday">Today</a>
        <a class="page-link" v-on:click="hydro.setDate(moment().format('YYYYMMDD'))" v-if="!hydro.isToday">
          {{ moment(hydro.date).format('D. MMMM') }}
        </a>
      </li>
      <li class="page-item" v-if="!hydro.isToday">
        <a class="page-link"
           v-on:click="hydro.setDate(hydro.dateNext)">&rightarrow;</a>
      </li>
      <li class="page-item disabled" v-else>
        <a class="page-link">&rightarrow;</a>
      </li>
    </ul>

    <div v-if="hydro.entries.length > 0" class="container-sm py-2">
      <div v-for="item of hydro.entries" v-bind:key="item.id" class="row py-2">
          <span class="col">
            <svgIcon :icon="item.icon" :fill="0" :size="30" :stroke="6"/>
          </span>
        <span class="col">
          <span style="font-weight: bold">{{ item.amount }}</span>ml
        </span>
        <span class="col">
          {{ moment(item.created_at).format('HH:mm') }}
        </span>
        <span class="col">
          <span class="btn btn-danger" v-on:click="hydro.delete(item.id)" v-if="item.id">X</span>
        </span>
      </div>
    </div>

    <div v-else class="py-5">
      no entries for
      {{ moment(hydro.date).format('DD.MM') }}
    </div>
    <i class="small">
      showing entries for <br/>
      {{ moment(hydro.dateStart).format('DD.MM.YYYY HH:mm') }} -
      {{ moment(hydro.dateEnd).format('DD.MM.YYYY HH:mm') }}
    </i>
  </div>
</template>
