<template>
  <div class="search">
    <form class="form" @submit.prevent="fetchCity(search)">
      <button
          type="submit"
          :disabled="!search"
          class="form__button"
      >
        <img src="@/assets/search.svg" class="form__svg" alt="search">
      </button>
      <input
          type="text"
          class="form__input"
          :placeholder="locale.placeholder"
          v-model.trim="search"
          @focus="onFocus"
      >
    </form>
    <ul class="list" :class="{'show': show}">
      <li
          v-for="(item, idx) in filtered"
          :key="idx"
          @click="chooseCity(item)"
          class="list__item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Search",
  props: ['show'],
  data() {
    return {
      search: '',
    }
  },

  computed: {
    ...mapGetters(['city', 'history', 'locale']),

    filtered() {
      return this.history.filter(city => {
        return city.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    ...mapActions(['fetch']),

    onFocus() {
      this.$emit('changeVisibility', true)
    },

    fetchCity(city) {
      this.fetch(city)
      this.cleatSearch()
      this.$emit('changeVisibility', false)
    },

    chooseCity(city) {
      this.search = city
      this.$emit('changeVisibility', false)
    },

    cleatSearch() {
      this.search = ''
    },
  }
}
</script>

<style scoped lang="scss">

.search {
  position: absolute;
  max-width: 240px;
  padding: 6px 0;
  border-color: rgba(223, 225, 229, 0);
  border-radius: 6px;
  box-shadow: 0 1px 6px #d2d2d2;
  overflow: hidden;
  z-index: 2;
  background: #fff;
}

.form {
  display: flex;
  padding: 0 6px;
}

.form__button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.form__svg {
  width: 20px;
  height: 20px;
  fill: #9aa0a6;
}

.form__input {
  flex: 1;
  font-family: Gotham SSm A, Gotham SSm B, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, Arial, sans-serif;
  font-weight: 600;
  font-size: 14px;
  outline: none;
  border: none;
  padding-left: 2px;
}

.list {
  display: none;
  padding: 0;
  margin: 0;

  &.show {
    display: block;
  }
}

.list__item {
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  padding: 3px 6px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }

  &:first-child {
    margin-top: 6px;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

</style>
