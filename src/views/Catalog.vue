<script>
import axios from "@/axios.js";

export default {
  data() {
    return {
      sneakers : [],
      selectedBrand: '',
      selectedModel: ''
    }
  },
  methods : {
    async loadSneakersList() {
      let response = await axios.get("/sneaker/all")
      this.sneakers = response.data;
    },
    async filterSneakersList() {
      try {
        let response = await axios.get("/sneaker/all", {
          params: {
            brand: this.selectedBrand,
            model: this.selectedModel
          }
        });
        this.sneakers = response.data; // Обновляем массив sneakers новыми данными
      } catch (error) {
        console.error("Ошибка при фильтрации:", error);
      }
    },
    goToSneakerDetail(id) {
      this.$router.push({ name: 'SneakerDetails', params: { id }});
    }
  },
  mounted() {
    this.loadSneakersList();
  }
}
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <!-- Форма фильтрации -->
        <div class="col-md-3 mb-3">
          <form method="get" @submit.prevent="filterSneakersList" class="form-inline">
            <div class="form-group mb-3">
              <label for="brand" class="mr-2">Бренд</label>
              <select v-model="selectedBrand" class="form-control" id="brand" name="brand">
                <option value="">Выберите бренд</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Asics">Asics</option>
                <option value="Reebok">Reebok</option>
                <option value="New Balance">New Balance</option>

                <!-- Добавьте другие бренды по необходимости -->
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="model" class="mr-2">Модель</label>
              <input v-model="selectedModel" type="text" class="form-control" id="model" name="model" placeholder="Введите модель">
            </div>
            <button type="submit" class="btn btn-primary">Фильтр</button>
          </form>
        </div>

        <!-- Список кроссовок -->
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-4 mb-4" v-for="sneaker in sneakers" :key="sneaker.id">
                <div class="card h-100" @click="goToSneakerDetail(sneaker.id)">
                  <img :src="sneaker.photoUrl" class="card-img-top" alt="Photo Sneaker">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ sneaker.model }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ sneaker.brand }}</h6>
                    <p class="card-text">Цена: $<span>{{ sneaker.price }}</span></p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.form-inline {
  display: flex;
  flex-direction: column;
}

.card-body a {
  text-decoration: none;
  color: inherit;
}

.btn {
  margin-top: 1rem;
}

.card-img-top {
  height: 290px; /* Установите нужную высоту */
  object-fit: cover; /* Обрезка изображения по высоте */
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-body {
  flex-grow: 1;
}

main {
  padding-top: 10%;
}

.text-dark {
  text-decoration: none;
  color: inherit;
}
</style>
