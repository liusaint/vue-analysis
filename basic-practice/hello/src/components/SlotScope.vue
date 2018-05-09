<template>
  <div class="hello">
    <slotChild>
      <template slot-scope="props">
        {{ props.msg }}
      </template>
    </slotChild>
    <slotChild>{{ msg }}</slotChild>
  </div>
</template>

<script>
import slotChild from './SlotChild.vue'
export default {
  name: 'slotScope',
  data () {
    return {
      msg: 'p msg　slot默认的作用域是引用该组件的作用域。'
    }
  },
  components: {
    slotChild
  }
}
</script>
