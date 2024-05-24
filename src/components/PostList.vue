<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between mb-3">
      <h2>Post List</h2>
      <router-link to="/create">
        <button class="btn btn-primary">Create New Post</button>
      </router-link>
    </div>
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th width="25%">Title</th>
          <th width="10%">Author</th>
          <th width="25%">Description</th>
          <th width="20%">Created At</th>
          <th width="20%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.user.name }}</td>
          <td>{{ post.description }}</td>
          <td>{{ new Date(post.created_at).toLocaleString() }}</td>
          <td>
            <router-link :to="{ name: 'view', params: { id: post.id } }">
              <button class="btn btn-primary btn-sm mr-2">View</button>
            </router-link>
            <router-link :to="{ name: 'edit', params: { id: post.id } }">
              <button class="btn btn-success btn-sm mr-2">Edit</button>
            </router-link>
            <button @click="confirmDelete(post.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BASE_URL } from "@/config";
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
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
        return;
      }

      axios
        .delete(`${BASE_URL}/api/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.fetchPosts();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              alert("You don't have access to delete this post.");
            } else {
              alert("An error occurred: " + error.response.data.message);
            }
          } else if (error.request) {
            alert("No response received from the server.");
          } else {
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
.container {
  max-width: 1000px;
}

.table {
  margin-top: 20px;
}

.thead-dark th {
  background-color: #343a40;
  color: white;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

.btn {
  margin-right: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.mt-5 {
  margin-top: 3rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
