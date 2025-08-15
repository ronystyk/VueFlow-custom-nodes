<template>        
    <!-- Pane de VueFlow -->
    <VueFlow 
        v-model="elements"
        :nodeTypes="nodeTypes"
        :minZoom="0.2"
        :maxZoom="2"
        @pane-ready="onPaneReady"
    />
</template>

<script setup>
// Importaciones de Vue
import { ref, markRaw } from 'vue'

// Importaciones de VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

// Nodos personalizados
import FormNode from './nodes/FormNode.vue'

// Tipos de nodos
const nodeTypes = {
    FormNode: markRaw(FormNode)
}

// Función para construir los nodos
const buildElements = (cols = 20, rowsByElement = 20) => {
    const elements = []
    // Nodo de entrada
    const inputId = 'input-0-0'
    elements.push({ id: inputId, type: 'input', position: { x: 100, y: 400 }, data: { label: 'Entrada' } })

    // Nodo de salida
    const outputId = 'output-0-0'
    elements.push({ id: outputId, type: 'output', position: { y: 100 +(rowsByElement + 1) * 400, x: 200 + ((cols + 1) * 400) }, data: { label: 'Salida' } })
    
    for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rowsByElement; j++) {
            // Datos del nodo
            const formData = {
                label: `Input ${i}-${j}`,
                name: `Form ${i}-${j}`,
                age: (i + j) % 100,
                email: `email${i}-${j}@example.com`,
                option: 'opcion1',
                checked: true
            }

            // Nodo de formulario
            const formNodeId = `form-${i}-${j}`
            elements.push({ id: formNodeId, type: 'FormNode', position: { y: 100 + j * 400, x: 100 + i * 400 }, data: formData })

            // Conexiones
            elements.push({ id: `ei-${inputId}-${i}-${j}`, source: inputId, target: formNodeId, animated: false })
            elements.push({ id: `eo-${inputId}-${i}-${j}`, source: formNodeId, target: outputId, animated: false })
        }
    }
    return elements
}

const elements = ref(buildElements())

const onNodeUpdate = (event) => {
    console.log('Evento onNodeUpdate capturado:', event)
    console.log('ID del nodo:', event.id)
    console.log('Datos del nodo:', event.data)
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}

#app {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}

.vue-flow {
    background-color: #f8f9fa;
}
</style>
