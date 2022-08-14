import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', userId: 1 },
    { id: '2', title: 'Second Post', content: 'More text', userId: 0 }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        content: content,
                        userId: userId
                    }
                }
            }
        },
        postUpdated: {
            reducer: (state, action) => {
                const { id, title, content } = action.payload
                const existingPost = state.find(post => post.id == id)
                if(existingPost) {
                    existingPost.title = title
                    existingPost.content = content
                }
            },
            prepare: (postId, title, content) => {
                return {
                    payload: {
                        id: postId,
                        title: title,
                        content: content
                    }
                }
            }
        },
        postDeleted: {
            reducer: (state, action) => {
                const { id, title, content } = action.payload
                const existingPost = state.find(post => post.id == id)
                if(existingPost) { 
                    state.pop(existingPost); 
                }
            },
            prepare: (id, title, content) => {
                return {
                    payload: {
                        id: id,
                        title: title,
                        content: content
                    }
                }
            }
        }
    }
});

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)


export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;