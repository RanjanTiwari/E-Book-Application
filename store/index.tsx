import { configureStore } from '@reduxjs/toolkit';

import CollectionReducer from './CollectionReducer';

export default configureStore({
  reducer: {
    benchmark_data: CollectionReducer,
  },
});
