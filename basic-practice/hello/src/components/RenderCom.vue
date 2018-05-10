<script>
export default {
  data: function () {
    return {
      blogTitle: 888
    }
  },
  methods: {
    handleClick () {
      alert(1)
    }
  },
  render: function (createElement) {
    return createElement('h' + this.msg, {
      on: {
        click: this.handleClick
      },
      // DOM 属性
      domProps: {
        innerHTML: 'baz',
        a: 1
      },
      // 正常的 HTML 特性
      attrs: {
        id: 'foo'
      },
      // 组件 props
      props: {
        myProp: 'bar'
      }
    }, [this.$slots.default, this.blogTitle])
  },
  props: ['msg']
}
</script>
