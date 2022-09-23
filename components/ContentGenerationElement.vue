<template>
  <div class="content-generation-element">
    <div class="left">
      <div v-if="variablesData.length">
        <h3>Variables:</h3>
        <ul class="form-inputs">
          <li class="form-input" v-for="variable in variablesData">
            <label v-html="variable.name" :for="variable.inputName"></label>
            <input type="text" :id="variable.inputName" :name="variable.inputName" v-model="variable.value"
                   @input="update" placeholder="Enter a value">
          </li>
        </ul>
      </div>
      <div class="form-input">
        <label>Content HTML</label>
        <textarea onfocus="this.select()">{{generatedContent}}</textarea>
      </div>
    </div>
    <div class="right">
      <h3>Content preview</h3>
      <div v-html="generatedContent"></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  content: ""
})

const generatedContent = ref("")

const sanitize = (str) => {
  return str.replace(/[^A-z ]/g, "").replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

/* parse variables from content */
let vars = props.content.match(/\{\{([^\}]*?)\}\}/g) || []
vars = vars.map(v => v.replace(/[{}]/g, "")).filter((value, index, self) => self.indexOf(value) === index)
const variables = ref(vars)

/* create input values and ref them */
const variablesData = ref(vars.map(name => ({
  name: name,
  inputName: sanitize(name),
  value: ""
})))

const update = () => {
  let html = props.content
  Object.values(variablesData.value)
      .map(variable => {
        if (variable.value) html = html.replace(new RegExp(`\{\{${variable.name}\}\}`, "g"), variable.value)
      })
  generatedContent.value = html
}

update()

</script>