<template>
  <div class="container">
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
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
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="post.description"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
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
        alert("An error occurred while fetching the post.");
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
        alert("Post updated successfully!");
        // Optionally, redirect to another page
        this.$router.push(`/home`);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert("You don't have access to edit this post.");
        } else if (error.request) {
          console.error("Error request:", error.request);
          alert("No response received from the server.");
        } else {
          console.error("Error message:", error.message);
          alert("Error: " + error.message);
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
