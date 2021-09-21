<template>
  <div class="weather" v-if="isObj">
    <div class="section">
      <div class="row row--space-between">
        <div>
          <div class="text">{{ geo.name }}</div>
          <div class="title">{{ Math.floor(geo.main.temp) }}°</div>
        </div>
        <div class="text--right">
          <img :src="'https://openweathermap.org/img/wn/' + geo.weather[0].icon + '.png'" class="icon" alt="">
          <div class="text">{{ geo.weather[0].description }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <ul class="list">
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.temp_max }} / {{ locale.temp_min }}</div>
            <div class="text">
              {{ Math.floor(geo.main.temp_max) }}°
              /
              {{ Math.floor(geo.main.temp_min) }}°
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.humidity }}</div>
            <div class="text">
              {{ geo.main.humidity }} %
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.pressure.name }}</div>
            <div class="text">
              {{ geo.main.pressure }} {{ locale.pressure.unit }}
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.visibility.name }}</div>
            <div class="text">
              {{ geo.visibility }} {{ locale.visibility.unit }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="section">
      <ul class="list">
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.wind.name }}</div>
            <div class="text">
              {{ (geo.wind.speed * 3.6).toFixed(2) }} {{ locale.wind.unit }}
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.sunrise }}</div>
            <div class="text">
              {{ getTime(this.geo.sys.sunrise) }}
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="row row--space-between">
            <div class="text">{{ locale.sunset }}</div>
            <div class="text">
              {{ getTime(this.geo.sys.sunset) }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Weather",
  computed: {
    ...mapGetters(['geo', 'locale']),

    isObj() {
      return Object.keys(this.geo).length
    }
  },

  methods: {
    getTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
  }
}
</script>

<style scoped lang="scss">

.weather {
  position: relative;
  z-index: 1;
  margin-top: 42px;

  @media (max-width: 767px) {
    margin-top: 49px;
  }
}

.section {
  max-width: 375px;
  padding: 6px;
  margin: 6px auto;
  border-color: rgba(223, 225, 229, 0);
  border-radius: 6px;
  box-shadow: 0 1px 6px #d2d2d2;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    margin: 9px auto;
  }
}

.list {
  padding: 0;
  margin: -3px 0;
  list-style: none;
}

.list-item {
  margin: 3px 0;
}

.row {
  display: flex;
}

.row--space-between {
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 14px;
  font-weight: 600;
}

.text--right {
  text-align: right;
}

.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  margin-top: 10px;
}

.icon {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 0 -10px auto;
}

</style>
