<template>
  <div class="sneaker-page">
    <div class="sneaker-card">
      <img class="sneaker-image" :src="sneaker.photoUrl" alt="sneaker image" />
      <div class="sneaker-info">
        <h1>{{ sneaker.brand }}</h1>
        <h3>{{ sneaker.model }}</h3>
        <p class="price">Цена: ${{ sneaker.price }}</p>
        <p class="description">{{ sneaker.description }}</p>
        <div class="actions">
          <button @click="likeSneaker" class="like-button">👍 {{ sneaker.likes }}</button>
          <button @click="dislikeSneaker" class="dislike-button">👎 {{ sneaker.dislikes }}</button>
        </div>
      </div>
    </div>

    <div class="comments-section">
      <h2>Комментарии</h2>
      <ul class="comments-list">
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.author }}:</strong> {{ comment.content }}
        </li>
      </ul>
      <form @submit.prevent="submitComment" v-if="isAuthenticated == true" class="comment-form">
        <textarea v-model="newComment.content" placeholder="Ваш комментарий" required></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios.js";

// Функция для генерации уникального идентификатора
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export default {
  data() {
    return {
      sneaker: {}, // Изменить на объект
      id: null,
      comments: [],
      newComment: {
        content: '',
        username: this.getUsername()
      },
      isAuthenticated : false

    };
  },
  methods: {
    getUsername() {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      console.log(decoded.role)
      return decoded.sub;

    },
    async loadSneakers() {
      try {
        this.id = this.$route.params.id;
        let response = await axios.get("/sneaker/detail", {
          params: { id: this.id }
        });
        this.sneaker = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке данных о кроссовке:", error);
      }
    },
    async likeSneaker() {
      try {
        await axios.post("/sneaker/like", {
          id: this.id,
          username: this.newComment.username
        });
        this.sneaker.likes += 1;
      } catch (error) {
        console.error("Ошибка при добавлении лайка:", error);
      }
    },
    async dislikeSneaker() {
      try {
        await axios.post("/sneaker/dislike", {
          id: this.id,
          username: this.newComment.username
        });
        this.sneaker.dislikes += 1;
      } catch (error) {
        console.error("Ошибка при добавлении дизлайка:", error);
      }
    },
    async submitComment() {
      if (this.newComment.username && this.newComment.content) {
        const newComment = {
          content: this.newComment.content,
          author : this.newComment.username,
          sneakerId : parseInt(this.id),

        };
        try {
          await axios.post("/comment/add", newComment);
          this.comments.push(newComment); // Обновить список комментариев
          this.newComment.content = ''; // Очистить поле ввода
        } catch (error) {
          console.error("Ошибка при отправке комментария:", error);
        }
      }
    },
    async loadComments() {
      let response = await axios.get("/comment/get", {
        params: { id: this.id }
      });
      this.comments = response.data
    },
    tokenInStorage() {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;
    },
  },
  mounted() {
    this.loadSneakers();
    this.tokenInStorage()
    this.loadComments();
    this.getUsername()
  }
};
</script>

<style scoped>
.sneaker-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  gap: 20px;
}

.sneaker-image {
  width: 100%;
  height: auto;
  max-width: 300px; /* ограничение максимальной ширины для мобильных */
  margin: 0 auto;
  border-radius: 8px;
}

.sneaker-info {
  flex: 1;
  margin-top: 10px;
  text-align: center;
}

.price {
  font-size: 20px;
  color: #e67e22;
  margin: 10px 0;
}

.description {
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap; /* позволяет кнопкам переноситься на следующую строку */
}

.like-button,
.dislike-button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.like-button {
  background-color: #2ecc71;
  color: white;
}

.dislike-button {
  background-color: #e74c3c;
  color: white;
}

.comments-section {
  margin-top: 30px;
}

.comments-list {
  list-style-type: none;
  padding: 0;
}

.comments-list li {
  background-color: #f1f1f1;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.comment-form input,
.comment-form textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-form button {
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #2980b9;
}

/* Медиазапросы для мобильных устройств */
@media (min-width: 600px) {
  .sneaker-card {
    flex-direction: row;
    align-items: center;
  }

  .sneaker-image {
    max-width: 600px;
    height: auto;
  }

  .sneaker-info {
    text-align: left;
  }

  .actions {
    justify-content: flex-start;
  }
}
</style>
