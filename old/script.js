function init() {
  // @ts-ignore
  const app = new Vue({
    el: '#app',
    data: {
      json,
    },
    template: `
      <div>
        <div v-bind:disabled="isButtonDisabled">{{ message }}</div>
        <button v-bind:disabled="isButtonDisabled">Button</button>
      </div>
    `,
  })
}

document.addEventListener('DOMContentLoaded', function() {
  init()
})
