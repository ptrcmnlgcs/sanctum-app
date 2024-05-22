<template>
  <div class="container">
    <button @click="createPost" class="btn btn-primary">Create New Post</button>
    <table class="table-striped">
      <thead>
        <tr>
          <th width="25%">Title</th>
          <th width="30%">Author</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.user.name }}</td>
          <td>{{ new Date(post.created_at).toLocaleString() }}</td>
          <td>
            <button
              @click="viewPost(post.id)"
              class="btn btn-primary mr-2 btn-sm"
            >
              View
            </button>
            <button
              @click="editPost(post.id)"
              class="btn btn-secondary mr-2 btn-sm"
            >
              Edit
            </button>
            <button
              @click="deletePost(post.id)"
              class="btn btn-danger mr-2 btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BASE_URL } from "@/config"; // Import named export
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    fetchPosts() {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case where token is not available
        return;
      }
      axios
        .get(`${BASE_URL}/api/posts`, { // Correct URL: Append `/api`
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = response.data.posts;
        })
        .catch((error) => {
          console.error("There was an error fetching the posts:", error);
        });
    },
    createPost() {
      
    },
    viewPost() {
      
    },
    editPost() {
      
    },
    deletePost() {
      
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.btn {
  margin-right: 0.5rem;
}
</style>
