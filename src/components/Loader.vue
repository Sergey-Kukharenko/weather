<template>
  <div class="loader" v-if="loading">
    <svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style scoped lang="scss">

$offset: 187;
$duration: 1.4s;

.loader {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  background: #ffffff91;
  backdrop-filter: blur(3px);
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.spinner {
  width: 40px;
  animation: rotator-04a0d67a 1.4s linear infinite;
  margin: auto;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
  colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #000;
  }
  25% {
    stroke: #000;
  }
  50% {
    stroke: #000;
  }
  75% {
    stroke: #000;
  }
  100% {
    stroke: #000;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
