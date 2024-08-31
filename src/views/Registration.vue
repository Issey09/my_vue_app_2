<script>
import axios from "@/axios.js";
import RegErrorComponent from "@/components/RegError.vue";
import AlreadyRegistred from "@/components/AlreadyRegistred.vue";

export default {
  components: {
    RegErrorComponent,
    AlreadyRegistred
  },
  data() {
    return {
      alreadyRegistered: false,
      showError: false,
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    async register() {
      try {
        let response = await axios.post("/reg", {
          username: this.username,
          password: this.password,
          email: this.email});
        this.alreadyRegistered = true;
        // Обработка успешного ответа, если требуется
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.showError = true;
        } else {
          this.showError = true;
        }
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <RegErrorComponent v-if="showError" :message="errorMessage" class="error"></RegErrorComponent>

    <!-- Форма -->
    <AlreadyRegistred v-if="alreadyRegistered == true"></AlreadyRegistred>
    <form method="POST" @submit.prevent="register" v-if="alreadyRegistered == false">
      <div class="form-signin">
        <div class="text-center">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        </div>

        <div class="form-group row">
          <label for="floatingInput" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-8">
            <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                v-model="email"
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="NameInput" class="col-sm-4 col-form-label">Name</label>
          <div class="col-sm-8">
            <input
                type="text"
                class="form-control"
                id="NameInput"
                placeholder="Johh"
                required
                v-model="username"
            />
          </div>
        </div>
        <div class="form-group row mt-2">
          <label for="floatingPassword" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
                v-model="password"
            />
          </div>
        </div>

        <div class="form-check text-start my-3">
          <input
              class="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-body-secondary text-center">© 2017–2024</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error{
  margin-top: 20px;
}
</style>
