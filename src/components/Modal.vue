<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="header"></slot>
        </p>
        <button class="delete" @click="$emit('close')"></button>
      </header>

      <div class="modal-card-body">
        <slot name="body"></slot>
      </div>

      <footer class="modal-card-foot">
        <slot name="footer">
          <button class="button modal-default-button" @click="$emit('close')">OK</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
}
</script>
