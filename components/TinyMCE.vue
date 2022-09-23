<template>
  <div>
    <editor
            api-key="no-api-key"
            :name="name"
            :id="name"
            model-events="change keyup blur focus paste"
            v-model="value"
            :initial-value="value"
            @blur="update($event, value)"
            :init="{
               height: 500,
               menubar: false,
               toolbar:
                 'undo redo | formatselect | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help'
       }"></editor>
  </div>
</template>

<script>
  import Editor from "@tinymce/tinymce-vue"
  export default {
    props: {
      name: String,
      modelValue: String
    },
    name: "tinymce",
    components: {
      editor: Editor
    },
    emits: ['update:modelValue', 'blur'],
    methods: {
      update(e, value){
        this.$emit('blur', e, value)
        setTimeout(()=> {
          e.target.targetElm.value = this.value
        })
      }
    },
    computed: {
      value: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit('update:modelValue', value)
        }
      }
    }
  }
</script>