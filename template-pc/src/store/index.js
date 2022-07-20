import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import example from './moduleA';


const loading = createLoadingPlugin({});

const store = init({
    models: {
        example,
    },
    plugins: [loading],
});
export default store;
