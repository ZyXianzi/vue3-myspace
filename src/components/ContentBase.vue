<template>
    <div class="home">
        <div class="container">
            <div class="card">
                <div class="card-body">
                  <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContentBase",
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>