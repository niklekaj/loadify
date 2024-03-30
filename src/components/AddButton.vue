<template>
    <button @click="emitClick">{{ buttonText }}</button>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: "AddButton",
    props: {
      buttonText: {
        type: String,
        default: 'Add'
      }
    },
    setup(props, { emit }) {
      const emitClick = () => {
        emit('add');
      };
  
      return {
        emitClick
      };
    }
  });
  </script>