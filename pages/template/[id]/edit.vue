<template>
  <div>
    <form @submit.prevent="submit">

      <input type="text" name="name" placeholder="Name" :value="template.name">

      <TinyMCE name="content" v-model="template.content"/>

      <input type="submit" value="Save">

    </form>
    <VariableOutputElement :content="template.content"/>
  </div>
</template>

<script setup>
const route = useRoute()
let template = ref({})
template.value = await $fetch(`/api/template/${route.params.id}`)

const submit = (e) => {
  let formData = new FormData(e.currentTarget)
  $fetch(`/api/template/${template.value.id}/update`, {
    method: 'post',
    body: Object.fromEntries(formData)
  })
}

</script>