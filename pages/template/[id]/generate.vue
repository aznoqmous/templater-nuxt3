<template>
  <div>
    <h2>{{template.name}}</h2>
    <ContentGenerationElement :content="template.content"/>
  </div>
</template>

<script setup>
const route = useRoute()
let template = ref({})
template.value = await $fetch(`/api/template/${route.params.id}`)
</script>