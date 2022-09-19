<template>
  <div>
    Create a new template
    <form @submit.prevent="submit">

      <input type="text" name="name" placeholder="Name">

      <TinyMCE name="content" v-model="content"/>

      <input type="submit" value="Create">

    </form>
    <VariableOutputElement :content="content"/>
  </div>
</template>

<script>
  export default {
    data: ()=> ({
      content: ""
    }),
    methods: {
      async submit(e) {
        let formData = new FormData(e.currentTarget)
        let res = await $fetch("/api/template/create", {
          method: 'post',
          body: Object.fromEntries(formData)
        })
      }
    }
  }
</script>
