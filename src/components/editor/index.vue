<!--  -->
<template>
  <div id="div1" ref="div">
    <editor-bar
        v-model="detail"
        :isClear="isClear"
        @change="change"
    ></editor-bar>

  </div>

</template>

<script>
import E from 'wangeditor'
import EditorBar from "../../common/editoritem";
import { GetlistUrl } from '../../api/apis'
export default {
  components: { EditorBar },
  data() {
    return {
      isClear: false,
      detail: "",
    };
  },
  methods: {
    change(val) {
    },
    init() {
      const editor = new E(this.$refs.div)

      // 或者 const editor = new E( document.getElementById('div1') )
      editor.create()
      editor.txt.html('<p>用 JS 设置的内容</p>')
    }
  },
  mounted(){
    this.init()
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>