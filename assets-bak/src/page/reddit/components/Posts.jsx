import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
    static propTypes = {
        posts: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired
        }).isRequired).isRequired
    };

    render() {
        return (
            <ul>
                {this.props.posts.map((post, i) =>
                    <li key={i}>{post.title}</li>
                )}
            </ul>
        )
    }
}
