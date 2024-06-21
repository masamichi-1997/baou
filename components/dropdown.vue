<template>
  <div>
    <button @click="isOpen = !isOpen">
      {{ selectedOption ? selectedOption.label : placeholder }}
    </button>

    <ul v-if="isOpen">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

const emits = defineEmits();
const { placeholder, options } = defineProps({
  placeholder: {
    type: String,
    default: "未選択",
  },
  options: {
    type: Array as () => Option[],
    required: true,
    default: [],
  },
});

const isOpen = ref(false);
const selectedOption: Ref<Option | null> = ref(null);
const selectOption = (option: Option): void => {
  isOpen.value = !isOpen.value;
  selectedOption.value = option;
  emits("option-selected", selectedOption.value.value);
};
</script>
