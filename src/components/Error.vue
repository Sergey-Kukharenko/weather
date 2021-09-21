<template>
  <div class="error" :class="{'active': error}">
    <div class="error-text">{{ message }}</div>
    <div class="error-button" @click="close">
      Close
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Error",
  computed: {
    ...mapGetters(['error', 'locale']),

    message() {
      return this.locale.error[this.error]
    }
  },

  methods: {
    ...mapActions(['clearError']),

    close() {
      this.clearError()
    }
  },
}
</script>

<style scoped lang="scss">
.error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 264px;
  position: absolute;
  top: 49px;
  left: 0;
  z-index: 2;
  color: #F3F3F4;
  background-color: #323232;
  padding: 7px 6px;
  margin: auto;
  opacity: 0;
  visibility: hidden;
  border-radius: 6px;
  transform: translateY(100%);
  transition: 0.15s cubic-bezier(0, 0, .2, 1) 0s, visibility 0.15s cubic-bezier(0, 0, .2, 1) 0.15s, opacity 0.15s cubic-bezier(0, 0, .2, 1) 0s;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
}

.error.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0%);
  transition: 0.15s cubic-bezier(0, 0, 0.2, 1) 0s, visibility 0.15s cubic-bezier(0, 0, 0.2, 1) 0s, opacity 0.15s cubic-bezier(0, 0, 0.2, 1) 0s;
}

.error-text {
  font-weight: 600;
  font-size: 14px;
}

.error-button {
  font-size: 14px;
  font-weight: 600;
  color: #FA5400;
  cursor: pointer;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: 3px;
}
</style>
