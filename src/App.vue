<template>
  <div class="widget">
    <Search
        @changeVisibility="onChange"
        :show="show"
        v-click-outside="onHide"
    />
    <Languages/>
    <Loader/>
    <Weather/>
    <Error/>
  </div>
</template>

<script>
import {mapActions} from "vuex";

import Weather from "@/components/Weather";
import Search from "@/components/Search";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import clickOutside from "@/directive/click-outside";
import Languages from "@/components/Languages";

export default {
  name: 'App',
  components: {
    Languages,
    Loader,
    Error,
    Search,
    Weather
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    ...mapActions(['fetchLocalStorage', 'fetchLanguage', 'fetch']),

    onHide() {
      this.show = false
    },

    onChange(data) {
      this.show = data
    }
  },

  directives: {
    'click-outside': clickOutside
  },

  created() {
    this.fetchLocalStorage()
    this.fetchLanguage()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Gotham SSm A, Gotham SSm B, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #27282c;

  @media (min-width: 767px) {
    min-height: calc(100vh - 16px);
  }
}

.widget {
  position: relative;
  max-width: 375px;
  min-height: 277px;
  padding: 1px 0;
  margin: -1px auto;
}
</style>
