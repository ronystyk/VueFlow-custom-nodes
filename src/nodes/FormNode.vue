<!-- NodeClick.vue -->
<template>
    <div class="input-node">
      <div class="node-header">
        <span class="node-icon">📋</span>
        <span class="node-title">{{ data?.label ?? 'Nodo sin título' }}</span>
      </div>
  
      <div class="node-content">
        <div class="input-group">
          <label>Nombre:</label>
          <input v-model="localData.name" type="text" placeholder="Ingresa tu nombre" @input="emitUpdate" />
        </div>
  
        <div class="input-group">
          <label>Edad:</label>
          <input v-model="localData.age" type="number" placeholder="0" @input="emitUpdate" />
        </div>
  
        <div class="input-group">
          <label>Email:</label>
          <input v-model="localData.email" type="email" placeholder="email@ejemplo.com" @input="emitUpdate" />
        </div>
  
        <div class="input-group">
          <label>Seleccionar:</label>
          <select v-model="localData.option" @change="emitUpdate">
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
  
        <div class="input-group">
          <label>
            <input type="checkbox" v-model="localData.checked" @change="emitUpdate" />
            Acepto los términos
          </label>
        </div>
      </div>
    </div>

    <Handle id="a" type="source" :position="Position.Right" />
    <Handle id="b" type="target" :position="Position.Left" />
  </template>
  
  <script setup>
  // Importaciones de Vue
  import { ref, watch } from 'vue'

  // Importaciones de VueFlow
  import { Handle, Position } from '@vue-flow/core'
  
  // Props del nodo
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  })
  
  // Emits del nodo
  const emit = defineEmits(['update-node'])
  
  // Copia local de los datos
  const localData = ref({ ...props.data })
  
  // Reactiva cuando cambian los datos externos
  watch(
    () => props.data,
    (newVal) => {
      localData.value = { ...newVal }
    },
    { deep: true }
  )
  
  // Emitir al padre para actualizar en Drawflow
  function emitUpdate() {
    emit('update-node', {
      id: props.id,
      data: localData.value
    })
  }
  </script>
  
  <style scoped>
  .input-node {
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #42b883;
    background: white;
    min-width: 220px;
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  }
  
  .node-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-weight: bold;
    color: #42b883;
  }
  
  .node-icon {
    font-size: 18px;
  }
  
  .node-title {
    font-size: 14px;
  }
  
  .node-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .input-group label {
    font-size: 12px;
    font-weight: 500;
    color: #666;
  }
  
  .input-group input,
  .input-group select {
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    background: #f9f9f9;
  }
  
  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: #42b883;
    background: white;
  }
  
  .input-group input[type='checkbox'] {
    width: auto;
    margin-right: 6px;
  }
</style>
  