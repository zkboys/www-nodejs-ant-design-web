import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
    };

    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        //组件渲染成功之后，获取一次数据。
        // selectedSubreddit 指的是reactjs或者frontend
        this.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit))
    };

    componentWillReceiveProps(nextProps) {
        // 组件接受props时调用？
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            this.dispatch(fetchPostsIfNeeded(nextProps.selectedSubreddit))
        }
    };

    handleChange = (nextSubreddit)=> {
        this.dispatch(selectSubreddit(nextSubreddit))
    };

    handleRefreshClick = (e)=> {
        e.preventDefault();
        //清除缓存
        this.dispatch(invalidateSubreddit(this.props.selectedSubreddit));
        //重新获取数据
        this.dispatch(fetchPostsIfNeeded(this.props.selectedSubreddit))
    };

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <div>
                <Picker value={selectedSubreddit}
                        onChange={this.handleChange}
                        options={[ 'reactjs', 'frontend' ]}/>
                <p>
                    {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>}
                    {!isFetching && <a href='#' onClick={this.handleRefreshClick}> Refresh </a>}
                </p>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
                {posts.length > 0 && <div style={{ opacity: isFetching ? 0.5 : 1 }}><Posts posts={posts}/></div>}
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
        } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)