<template>
  <div class="hello">
    <slot :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  name: 'slotChild',
  data () {
    return {
      msg: 'c msg 通过slot把组件中的值传入slot,给插入slot的内容使用。'
    }
  }
}
</script>
