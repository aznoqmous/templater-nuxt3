<template>
  <div>
    Create a new template
    <form @submit.prevent="submit">

      <div class="form-input">
        <label>Template name</label>
        <input type="text" name="name" placeholder="Name">
      </div>

      <TinyMCE name="content" v-model="content"/>

      <input class="button" type="submit" value="Create">

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
        await $fetch("/api/template/create", {
          method: 'post',
          body: Object.fromEntries(formData)
        })
        navigateTo("/template/list")
      }
    }
  }
</script>
