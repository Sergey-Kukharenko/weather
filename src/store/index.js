import {createStore} from 'vuex'
import shared from './modules/shared';
import cities from './modules/geo';

export default createStore({
    modules: {
        shared, cities
    }
});
