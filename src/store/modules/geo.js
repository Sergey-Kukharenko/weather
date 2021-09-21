import axios from 'axios';
import locale from '@/locale';

export default {
    state: {
        city: '',
        history: [],
        geo: {},
        language: 'ru',
        locale: locale
    },

    mutations: {
        set(state, payload) {
            state.geo = payload;
        },

        update(state, payload) {
            state.city = payload;
        },

        setHistory(state, payload) {
            state.history = payload
        },

        updateHistory(state, payload) {
            state.city = payload
            const duplicate = state.history.find(item => item === payload)

            duplicate
                ? state.history.splice(state.history.indexOf(duplicate), 0)
                : state.history.push(payload)
        },

        saveLocalStorage(state) {
            localStorage.setItem('key', JSON.stringify(state.history))
        },

        setLanguage(state, payload) {
            state.language = payload
        },

        saveLanguageLocalStorage(state) {
            localStorage.setItem('lang', JSON.stringify(state.language))
        }
    },

    actions: {
        async fetch({commit, dispatch, getters}, payload) {
            commit('clearError')
            commit('setLoading', true);

            let query = getters.city
            if (payload) {
                query = payload
            }

            await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${process.env.VUE_APP_APPID}&units=metric&lang=${getters.language}`)
                .then(response => response.data)
                .then(geo => {
                    commit('set', geo)
                    commit('updateHistory', geo.name)
                    commit('saveLocalStorage')
                    commit('setLoading', false)
                })
                .catch(error => {
                    dispatch('setError', error.message);
                    commit('setLoading', false);
                });
        },

        fetchLocalStorage({commit}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                let history = []
                const data = JSON.parse(localStorage.getItem('key'))
                if (data) {
                    history = data
                }
                commit('setHistory', history)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        fetchLanguage({commit, getters}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                const data = JSON.parse(localStorage.getItem('lang'))
                let language = getters.language
                if (data) {
                    language = data
                }
                commit('setLanguage', language)
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },

        async updateLanguage({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true);
            commit('setLanguage', payload);
            commit('saveLanguageLocalStorage', payload);

            await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${getters.city}&APPID=${process.env.VUE_APP_APPID}&units=metric&lang=${getters.language}`)
                .then(response => response.data)
                .then(geo => {
                    commit('set', geo)
                    commit('setLoading', false)
                })
                .catch(error => {
                    commit('setError', error.message);
                    commit('setLoading', false);
                });
        }
    },

    getters: {
        city: state => state.city,
        geo: state => state.geo,
        history: state => state.history,
        locale: state => state.locale[state.language],
        localeLanguages: state => state.locale,
        language: state => state.language,
    }
}
