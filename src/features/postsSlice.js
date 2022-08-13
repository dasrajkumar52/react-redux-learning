import { createSlice, nanoid } from "@reduxjs/toolkit";
import { title } from "faker/lib/locales/az";

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content) => {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        content: content
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
        }
    }
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;