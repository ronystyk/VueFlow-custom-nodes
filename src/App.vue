<template>
    <div style="width: 100vw; height: 100vh">
        <LoadingOverlay 
            :loading="loading" 
            :initTime="initTime" 
        />
        
        <MetricsPanel 
            :initTime="initTime"
            :paneReadyTime="paneReadyTime"
            :totalAppTime="totalAppTime"
            :memoryUsage="memoryUsage"
            :memoryInfo="memoryInfo"
            :cpuInfo="cpuInfo"
            :gpuInfo="gpuInfo"
            :performanceMetrics="performanceMetrics"
            :cpuUsage="cpuUsage"
            :gpuUsage="gpuUsage"
            :frameTime="frameTime"
        />
        
        <VueFlow 
            v-model="elements"
            :nodeTypes="nodeTypes"
            @pane-ready="onPaneReady"
        />
    </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import InputNode from './nodes/InputNode.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import MetricsPanel from './components/MetricsPanel.vue'
import { usePerformanceMetrics } from './composables/usePerformanceMetrics'

// Usar el composable de métricas de rendimiento
const {
    initTime,
    loading,
    paneReadyTime,
    totalAppTime,
    memoryUsage,
    memoryInfo,
    cpuInfo,
    gpuInfo,
    performanceMetrics,
    cpuUsage,
    gpuUsage,
    frameTime,
    onPaneReady
} = usePerformanceMetrics()

const nodeTypes = {
    inputNode: markRaw(InputNode)
}

const buildElements = (cols = 100, rowsByElement = 100) => {
    const elements = []
    elements.push({ id: 'input-0-0', type: 'input', position: { x: 100, y: 400 }, data: { label: 'Entrada' } })
    const inputId = 'input-0-0'
    const outputId = 'output-0-0'
    for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rowsByElement; j++) {
            elements.push({ id: `input-${i}-${j}`, type: 'inputNode', position: { y: 100 + j * 400, x: 100 + i * 400 }, data: { label: `Input ${i}-${j}` } })
            elements.push({ id: `ei-${inputId}-${i}-${j}`, source: inputId, target: `input-${i}-${j}`, animated: false })
            elements.push({ id: `eo-${inputId}-${i}-${j}`, source: `input-${i}-${j}`, target: outputId, animated: false })
        }
    }
    elements.push({ id: outputId, type: 'output', position: { y: 100 +(rowsByElement + 1) * 400, x: 200 + ((cols + 1) * 400) }, data: { label: 'Salida' } })
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
