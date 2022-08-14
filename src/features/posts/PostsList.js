import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.userId} />
            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>&nbsp;
            <Link to={`/editPost/${post.id}`} className="button muted-button">Edit Post</Link>&nbsp;
            <Link to={`/deletePost/${post.id}`} className="button muted-button">Delete Post</Link>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
