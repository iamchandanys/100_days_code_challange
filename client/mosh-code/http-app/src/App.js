import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    this.setState({ posts: data });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", obj);
    const posts = [data, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "Update title";
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    const clonedPosts = [...this.state.posts];
    const index = clonedPosts.indexOf(post);
    clonedPosts[index] = post;
    this.setState({ posts: clonedPosts });
  };

  handleDelete = async (post) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
    const filteredPosts = this.state.posts.filter((e) => e.id !== post.id);
    this.setState({ posts: filteredPosts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => this.handleUpdate(post)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(post)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
