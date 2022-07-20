import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import home from './home';


const loading = createLoadingPlugin({});

const store = init({
    models: {
        home,
    },
    plugins: [loading],
});
export default store;
