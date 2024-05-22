<template>
    <div class="container">
      <h1>Create Post</h1>
      <form @submit.prevent="createPost">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="post.title"
            required
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            class="form-control"
            id="description"
            v-model="post.description"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  import { BASE_URL } from "@/config"; // Import named export
  import axios from "axios";
  
  export default {
    data() {
      return {
        post: {
          title: "",
          description: "",
        },
      };
    },
    methods: {
      async createPost() {
        try {
          console.log('BASE_URL:', BASE_URL);
          const token = localStorage.getItem("token");
          console.log('Token:', token);
          console.log('Post data:', this.post);
  
          const response = await axios.post(`${BASE_URL}/api/create`, this.post, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Handle successful creation, e.g., redirect or show a success message
          console.log('Response:', response.data);
          alert('Post created successfully!');
          // Optionally, redirect to another page
          // this.$router.push('/posts');
        } catch (error) {
          // Handle error
          if (error.response) {
            console.error('Error response:', error.response.data);
            alert('An error occurred: ' + error.response.data.message);
          } else if (error.request) {
            console.error('Error request:', error.request);
            alert('No response received from the server.');
          } else {
            console.error('Error message:', error.message);
            alert('Error: ' + error.message);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>
  
<style scoped>
.container {
  margin-top: 20px;
}
</style>
