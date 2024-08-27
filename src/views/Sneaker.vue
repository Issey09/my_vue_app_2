<template>
  <div>
    <h1>Details for Sneaker ID: {{ id }}</h1>
    <!-- Здесь можно вывести подробную информацию о кроссовке -->
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  data() {
    return {
      id: null
    };
  },
  async created() {
    this.id = this.$route.params.id;
    let response = await axios.get("/")

    // Здесь можно сделать запрос на сервер для получения данных о кроссовке по ID
  }
};
</script>
