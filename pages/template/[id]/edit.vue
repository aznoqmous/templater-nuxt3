<template>
  <div>
    <form ref="form">

      <div class="form-input">
        <label>Template name</label>
        <input type="text" @input="update" name="name" placeholder="Name" :value="template.name" required>
      </div>

      <TinyMCE ref="editor" name="content" v-model="template.content" @update:modelValue="update"/>

    </form>
    <VariableOutputElement :content="template.content"/>
  </div>
</template>

<script setup>
import {ref} from "vue";

const route = useRoute()

const template = ref({})
template.value = await $fetch(`/api/template/${route.params.id}`)

const form = ref({})

let editor = ref("")

let submitTimeout = null
const update = ()=>{
  form.value.classList.remove('saved')
  form.value.classList.add('typing')
  if(submitTimeout) clearTimeout(submitTimeout)
  submitTimeout = setTimeout(()=> submit(), 1000)
}

const submit = async (e) => {
  let formEl = form.value
  let formData = new FormData(formEl)
  form.value.classList.remove('typing')
  form.value.classList.add('loading')
  formData.set('content', editor.value.value)
  await $fetch(`/api/template/${template.value.id}/update`, {
    method: 'post',
    body: Object.fromEntries(formData)
  })
  formEl.classList.remove('loading')
  formEl.classList.add('saved')
}

</script>