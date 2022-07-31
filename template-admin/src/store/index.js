import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import * as models from './module';

const loading = createLoadingPlugin({});

const store = init({
    models,
    plugins: [loading],
});
export default store;
