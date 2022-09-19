<template>
  <div v-if="variables.length">
    Variables:
    <ul>
      <li v-for="variable in variables">
        {{variable}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default  {
    props: {
      content: ""
    },
    data: ()=>({
      variables: ""
    }),
    computed: {
      variables(){
        let variables = this.content.match(/\{\{([^\}]*?)\}\}/g) || []
        return variables.map(variable => variable.replace(/[{}]/g, ""))
      }
    }
  }
</script>