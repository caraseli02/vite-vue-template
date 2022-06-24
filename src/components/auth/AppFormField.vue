<script lang="ts">
import { defineComponent } from 'vue'
import { ErrorMessage as VeeErrorMessage, Field as VeeField } from 'vee-validate'
export default defineComponent({
  components: {
    VeeField,
    VeeErrorMessage,
  },
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
})
</script>

<template>
  <div class="relative">
    <label class="flex text-sm font-medium leading-5 text-secondary my-2" :for="name">{{
      label
    }}</label>
    <VeeField
      :id="name"
      :name="name"
      :label="label"
      :model-value="modelValue"
      class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
      v-bind="$attrs"
      :data-vi="name"
      :disabled="disabled"
      @input="$emit('modelUpdate', $event)"
    />
    <VeeErrorMessage
      :name="name"
      class="text-yellow-500 right-0 bottom-0 text-xs"
      :data-vi="`${name}Error`"
    />
  </div>
</template>
