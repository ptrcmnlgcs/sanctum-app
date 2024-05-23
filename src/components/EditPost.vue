<template>
  <div class="container p-4">
    <h1 class="animate__animated animate__fadeInDown">Edit Post</h1>
    <form @submit.prevent="updatePost" class="animate__animated animate__fadeInUp">
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
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="post.description"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary animated-button">Update</button>
    </form>
    <transition name="fade">
      <div v-if="successMessage" class="alert alert-success mt-3 animate__animated animate__fadeIn">{{ successMessage }}</div>
    </transition>
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger mt-3 animate__animated animate__fadeIn">{{ errorMessage }}</div>
    </transition>
  </div>
</template>

<script>
import { BASE_URL } from "@/config";
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
        console.error("Error fetching post:", error);
        this.errorMessage = "An error occurred while fetching the post.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      }
    },
    async updatePost() {
      try {
        const postId = this.$route.params.id;
        const response = await axios.put(
          `${BASE_URL}/api/edit/${postId}`,
          this.post,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Handle successful update, e.g., redirect or show a success message
        console.log("Response:", response.data);
        this.successMessage = "Post updated successfully!";
        this.errorMessage = "";
        setTimeout(() => {
          this.successMessage = "";
          this.$router.push({ name: 'home' });
        }, 2000);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          this.errorMessage = 'An error occurred: ' + error.response.data.message;
        } else if (error.request) {
          console.error("Error request:", error.request);
          this.errorMessage = 'No response received from the server.';
        } else {
          console.error("Error message:", error.message);
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
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.alert {
  margin-top: 20px;
}
</style>
