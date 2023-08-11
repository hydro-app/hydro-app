<script lang="ts">
import {defineComponent} from 'vue'
import {v4 as uuidv4} from 'uuid';


export default defineComponent({
  data() {
    return {
      uuid: uuidv4(),
    }
  },
  props: {
    icon: {
      type: String,
      default: 'heart'
    },
    fill: {
      type: Number,
      default: 50,
    },
    color: {
      type: String,
      default: 'lightblue',
    },
    size: {
      type: Number,
      default: 50,
    },
    stroke: {
      type: Number,
      default: 6,
    }

  },
  methods: {
    getMask() {
      return "url(#" + this.uuid + ")"
    },
    getHref() {
      return '#' + this.icon
    },
    getFill() {
      return (100 - this.fill) + '%'
    },
    getStyle() {
      return 'height: ' + this.size + 'px; width: ' + this.size + 'px;'
    }
  },
})
</script>

<template>
  <svg class="svg-icon" :style="getStyle()">
    <defs>
      <mask :id="uuid">
        <use fill="white" :href="getHref()"></use>
      </mask>
    </defs>
    <rect x="0" :y="getFill()" :fill="color" width="100%" height="100%" :mask="getMask()"/>
    <use :href="getHref()" :stroke-width="stroke" stroke="#333" fill="none"></use>
  </svg>
</template>

