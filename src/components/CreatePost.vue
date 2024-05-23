<template>
  <div class="container p-4">
    <h1>Create Post</h1>
    <form @submit.prevent="createPost">
      <div class="form-group mb-3">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="post.title"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="content">Content</label>
        <textarea
          class="form-control"
          id="description"
          v-model="post.description"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary animated-button">Create</button>
    </form>
    <transition name="fade">
      <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </transition>
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
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    async createPost() {
      try {
        console.log('BASE_URL:', BASE_URL);
        const token = localStorage.getItem("token");
        console.log('Token:', token);
        console.log('Post data:', this.post);

        const response = await axios.post(${BASE_URL}/api/create, this.post, {
          headers: {
            Authorization: Bearer ${token},
          },
        });

        // Handle successful creation, e.g., redirect or show a success message
        console.log('Response:', response.data);
        this.successMessage = "Post created successfully!";
        this.errorMessage = "";
        setTimeout(() => {
          this.successMessage = "";
          this.$router.push({ name: 'home' });
        }, 2000);

      } catch (error) {
        // Handle error
        if (error.response) {
          console.error('Error response:', error.response.data);
          this.errorMessage = 'An error occurred: ' + error.response.data.message;
        } else if (error.request) {
          console.error('Error request:', error.request);
          this.errorMessage = 'No response received from the server.';
        } else {
          console.error('Error message:', error.message);
          this.errorMessage = 'Error: ' + error.message;
        }
        this.successMessage = "";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.container:hover {
  transform: scale(1.02);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.animated-button {
  transition: background-color 0.3s, transform 0.2s;
}

.animated-button:hover {
  background-color: #007bff;
  transform: translateY(-2px);
}

.animated-button:active {
  transform: translateY(1px);
}

.spinner-border {
  margin-right: 5px;
}
</style>
