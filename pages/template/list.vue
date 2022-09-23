<template>
  <div>
    <table v-if="templates.length">
      <thead>
        <tr>
          <th>Template name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="template in templates">
          <td>{{ template.name }}</td>
          <td class="actions">
              <a  class="button" :href="`/template/${template.id}/edit`">Edit</a>
              <a class="button" :href="`/template/${template.id}/generate`">Generate</a>
              <span class="button error" @click="remove(template)">Delete</span>
          </td>
        </tr>
      </tbody>
    </table>
    <a class="button" href="/template/create">
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

</script>
