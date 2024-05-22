<template>
    <div class="container">
      <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.description }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { BASE_URL } from "@/config"; // Import named export
  import axios from "axios";
  
  export default {
    data() {
      return {
        post: null,
      };
    },
    created() {
      this.fetchPost();
    },
    methods: {
      async fetchPost() {
        try {
          const postId = this.$route.params.id;
          const response = await axios.get(`${BASE_URL}/api/view/${postId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          this.post = response.data.post;
        } catch (error) {
          console.error('Error fetching post:', error);
          alert('An error occurred while fetching the post.');
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
  