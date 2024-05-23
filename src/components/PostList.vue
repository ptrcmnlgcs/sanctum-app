<template>
  <div class="container">
    <router-link to="/create"
      ><button @click="createPost" class="btn btn-primary">
        Create New Post
      </button></router-link
    >
    <table class="table-striped">
      <thead>
        <tr>
          <th width="25%">Title</th>
          <th width="10%">Author</th>
          <th width="10%">Description</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.user.name }}</td>
          <td>{{ post.description }}</td>
          <td>{{ new Date(post.created_at).toLocaleString() }}</td>
          <td>
            <router-link :to="{ name: 'view', params: { id: post.id } }"
              class="btn btn-primary mr-2 btn-sm"
            >View</router-link>
            <router-link :to="{ name: 'edit', params: { id: post.id } }"
              class="btn btn-success mr-2 btn-sm"
            >Edit</router-link>
            <button
              @click="confirmDelete(post.id)"
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
      axios
        .get(`${BASE_URL}/api/posts`, {
          // Correct URL: Append `/api`
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this post?")) {
        this.deletePost(id);
      }
    },
    deletePost(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case where token is not available
        return;
      }
      
      axios
        .delete(`${BASE_URL}/api/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          this.fetchPosts();
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response:", error.response.data);
            if (error.response.status === 403) {
              alert("You don't have access to delete this post.");
            } else {
              alert("An error occurred: " + error.response.data.message);
            }
          } else if (error.request) {
            console.error("Error request:", error.request);
            alert("No response received from the server.");
          } else {
            console.error("Error message:", error.message);
            alert("Error: " + error.message);
          }
        });
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
