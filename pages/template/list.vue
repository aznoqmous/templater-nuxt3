<template>
  <div>
    <table v-if="templates.length">
      <tr v-for="template in templates">
        <td>{{ template.name }}</td>
        <td @click="edit(template)">Edit</td>
        <td @click="remove(template)">Delete</td>
      </tr>
    </table>
    <a href="/template/create">
      Create a new template
    </a>
  </div>
</template>
<script setup>

  let templates = ref([])
  templates.value = await $fetch("/api/template/list")

  const remove = async (template)=>{
    const result = await $fetch("/api/template/remove", {
      method: "POST",
      body: template
    })
    templates.value = await $fetch("/api/template/list")
  }
  const edit = template =>{
    navigateTo(`/template/${template.id}/edit`)
  }

</script>
