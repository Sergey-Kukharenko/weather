<template>
  <div class="lang" v-if="isObj">
    <div
        v-for="(_, key) in localeLanguages"
        :key="key"
        class="lang-button"
        :class="{'active': key === language}"
        @click="setLang(key)">
      {{ key }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Languages",

  data() {
    return {
      saveLanguage: null
    }
  },

  computed: {
    ...mapGetters(['localeLanguages', 'language', 'geo']),

    isObj() {
      return Object.keys(this.geo).length
    }
  },

  methods: {
    setLang(language) {
      if (language !== this.saveLanguage)
        this.$store.dispatch('updateLanguage', language)
      this.saveLanguage = language
    }
  }
}
</script>

<style scoped lang="scss">
.lang {
  display: flex;
  position: absolute;
  top: 6px;
  right: 0;
  border-radius: 6px;
  box-shadow: 0 1px 6px #d2d2d2;
  overflow: hidden;
}

.lang-button {
  font-family: Gotham SSm A, Gotham SSm B, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 3px 3px;
  background: #fff;
  transition: background 0.15s cubic-bezier(0, 0, 0.2, 1) 0s, color 0.15s cubic-bezier(0, 0, 0.2, 1) 0s;
  cursor: pointer;
  user-select: none;

  &.active {
    background: #000000;
    color: #fff;
  }
}
</style>
