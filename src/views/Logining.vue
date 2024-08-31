<script>
import axios from "@/axios.js";
import AlreadyLogin from "@/components/AlreadyLogin.vue";
import LogError from "@/components/LogError.vue";

export default {
  components: {
    AlreadyLogin,
    LogError
  },
  data() {
    return {
      alreadyLogin: false,
      showError: false,
      username: "",
      password: "",
      email: "",

    };
  },
  methods: {
    async logining() {
      try {
        let response = await axios.post("/log", {
          username: this.username,
          password: this.password});
        this.alreadyLogin = true;
        this.showError = false;

        const token = response.data;
        // Сохраняем токен в localStorage

        localStorage.setItem('token', token)
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
    <LogError v-if="showError == true" class="error"></LogError>
    <AlreadyLogin v-if="alreadyLogin == true"></AlreadyLogin>


    <form method="POST" @submit.prevent="logining" v-if="alreadyLogin == false">
      <div class="form-signin">
        <div class="text-center">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
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
  background-color: #adb5bd;
  justify-content: center;
  align-items: center;
}
.error{
  margin-top: 20px;
}
</style>
