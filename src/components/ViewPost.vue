<template>
  <div class="container">
    <div v-if="post" class="post-content animate-slideIn">
      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>
    </div>
    <div v-else class="loading-message animate-fadeIn">
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
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

p {
  font-size: 1.2em;
  color: #555;
  text-align: center;
}

.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.2em;
  color: #777;
}

.animate-slideIn {
  animation: slideIn 0.5s ease-in-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
