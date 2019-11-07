<template>
  <div class="com-editor">
    <textarea :id="editorId"></textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import tinymce from 'tinymce'

import { Settings } from 'tinymce'

export default Vue.extend({
  name: 'ComEditor',

  props: {
    value: String,

    config: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      editorId: 'editor-' + Math.floor(Date.now() * Math.random())
    }
  },

  mounted() {
    this.initEditor()
  },

  destroyed() {
    this.destroyEditor()
  },

  methods: {
    initEditor() {
      tinymce.init(Object.assign({}, this.config, this.defaultConfig()))
    },

    defaultConfig(): Settings {
      return {
        selector: `#${this.editorId}`,
        language: 'zh_CN',
        height: 618,
        menubar: 'file edit view insert format tools table help',
        toolbar: [
          'bold italic underline strikethrough removeformat alignleft aligncenter alignright alignjustify outdent indent forecolor backcolor numlist bullist',
          '',
          'undo redo searchreplace charmap emoticons link image media anchor pagebreak print fullscreen preview'
        ],
        plugins: [
          'print preview fullpage paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
        ],
        init_instance_callback: editor => {
          if (this.value) {
            editor.setContent(this.value)
          }

          editor.on('NodeChange Change KeyUp SetContent Undo Redo', () => {
            this.$emit('input', editor.getContent())
          })
        }
      }
    },

    destroyEditor() {
      const editor = tinymce.get(this.editorId)

      if (editor) {
        editor.destroy()
      }
    }
  }
})
</script>
