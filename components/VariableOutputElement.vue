<template>
  <div>
    <h3>Variables</h3>
    <ul v-if="variables.length">
      <li v-for="variable in variables">
        {{variable}}
      </li>
    </ul>
    <legend v-html="`Use {{your variable name}} to create a variable`">
    </legend>
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
        return variables.filter((value, index, self)=> self.indexOf(value) === index)
      }
    }
  }
</script>