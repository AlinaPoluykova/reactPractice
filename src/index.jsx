
var CommentForm = React.createClass({
	getInitialState: function(){
		return {'author': '', 'text': ''};
	},
	handleAuthorChange: function(e){
		this.setState({ 'author': e.target.value });
	},
	handleTextChange: function(e){
		this.setState({ 'text': e.target.value });
	},
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.handleNewComment({'author': author, 'text': text, 'id': Math.random()*10000});
		this.setState({author: '', text: ''});
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
				<input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}/>
				<input type="submit" value="Post" />
			</form>
		);
	}
});

var CommentBox = React.createClass({
	getInitialState: function(){
		return {data: []}
	},
	handleNewComment: function(comment){
		var newData = this.state.data;
		newData.push(comment);
		this.setState({data: newData});
	},
	componentDidMount: function(){
		var that = this;
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				that.setState({data: data});
			},
			error: function(xhr, status, err) {
				console.error(that.props.url, status, err.toString());
			}
		});
	},
	render: function () {
		console.log(this.props);
		return (
			<div className='CommentBox'>
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm handleNewComment={this.handleNewComment}/>
			</div>
		);
	}
});

var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function () {
		var CommentNodes = this.props.data.map(function(comment){
			return <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>;
		});
		return (
			<div className="CommentList">
				{CommentNodes}
			</div>
		);
	}
});


ReactDOM.render(<CommentBox url="/comments.json"/>, document.getElementById('application'));
