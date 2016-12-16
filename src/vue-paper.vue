<template lang="html">
  <template v-for="item in items">
    {{ item.type }}
  </template>
</template>

<script>
import computed from './module/computed'

export default {
  props:['msg'],
  computed
}
</script>

<style lang="css">
</style>
