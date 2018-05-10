<template>
<div>
  <render-com msg="5">inner</render-com>
</div>
</template>
<script>
import RenderCom from '@/components/RenderCom'
export default {
  components: { RenderCom }
}
</script>
