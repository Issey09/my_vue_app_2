<template>
  <main>
    <div class="container">
      <div class="row">
        <ul class="list-unstyled d-flex flex-wrap justify-content-center">
          <li class="col-md-6 mb-4" v-for="sneaker in sneakers" :key="sneaker.id">
            <div class="sneaker-block" @click="goToSneakerDetail(sneaker.id)">
              <img :src="sneaker.photoUrl" class="sneaker-img" :alt="sneaker.model">
              <div class="sneaker-info">
                <h1 class="card-title">{{sneaker.brand}}</h1>
                <h3 class="card-model">{{sneaker.model}}</h3>
                <h5 class="card-color">{{sneaker.color}}</h5>
                <p class="card-price">{{sneaker.price}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "@/axios.js";

export default {
  data() {
    return {
      sneakers: [],
    };
  },
  methods: {
    async loadIndex() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/");
        this.sneakers = response.data;

      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    goToSneakerDetail(id) {
      this.$router.push({ name: 'SneakerDetails', params: { id }});
    }
  },
  mounted() {
    this.loadIndex();
  },
};
</script>

<style scoped>
body {
  background-color: #adb5bd;
  color: #fff;
  font-family: "Kanit", sans-serif;
  font-weight: 100;
  margin: 0;
  padding: 0;
}


.sneaker-block {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;

  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sneaker-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}



.sneaker-info {
  margin-top: 15px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f8d7da;
}

.card-model {
  font-size: 1.2rem;
  color: #f1c40f;
}

.card-color {
  font-size: 1rem;
  color: #e67e22;
}

.card-price {
  font-size: 1rem;
  color: #2ecc71;
}

main {
  padding-top: 90px; /* Высота header */
}

.text-dark {
  text-decoration: none;
  color: inherit;
}
</style>
