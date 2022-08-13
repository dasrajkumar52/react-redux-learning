import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './../features/postsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer
  }
})