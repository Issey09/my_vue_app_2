<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="./components/icons/8317482.png" alt="Logo" class="logo">
      </router-link>
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="userIsAdmin == true">
            <router-link to="/admin" class="nav-link" @click="closeMenu">Админка</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sneakers/all" class="nav-link" @click="closeMenu">Каталог</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/reg" class="nav-link" @click="closeMenu">Зарегистрироваться</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/log" class="btn btn-outline-primary" @click="closeMenu">Войти</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <button @click="logout" class="btn btn-outline-primary">Выйти</button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <main :class="{ 'menu-open': isMenuOpen }">
    <RouterView></RouterView>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      isMenuOpen: false,
      userIsAdmin: false
    };
  },
  methods: {
    tokenInStorage() {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;
    },
    getRole() {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);

      if (decoded.role == "ADMIN") {
        this.userIsAdmin = true
      }


    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.closeMenu();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  },
  mounted() {
    this.tokenInStorage();
    this.getRole()
  }
};
</script>

<style scoped>
/* General styles */
body {
  background-size: cover;
  color: #fff;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}

.navbar {
  padding: 10px 15px;
  background-color: #14283b;
  z-index: 1000;
}

.navbar-brand .logo {
  transform: rotate(30deg);
  width: 50px;
}

.navbar-nav .nav-link {
  color: #fff;
  font-size: 1rem;
  margin: 0 10px;
}

.navbar-nav .btn {
  font-size: 1rem;
  margin: 0 10px;
}

.collapse.navbar-collapse.show {
  display: block !important;
  background-color: #212529;
  position: relative;
  width: 100%;
  padding: 18px;
  justify-content: center;
  text-align: center;
}

.navbar-nav {
  flex-direction: column;
}

.nav-item {
  text-align: center;
}

/* Adjust main content when menu is open */
main {
  padding-top: 70px;
  transition: margin-top 0.3s ease;
}

main.menu-open {
  margin-top: 200px; /* Adjust as needed based on the menu height */
}

/* Media queries for responsive design */
@media (min-width: 768px) {
  .navbar-nav {
    flex-direction: row;
  }

  .collapse.navbar-collapse {
    display: flex !important;
    flex-direction: row;
    justify-content: flex-end;
    background-color: transparent;
    position: static;
  }

  .collapse.navbar-collapse.show {
    background-color: transparent;
    position: static;
    padding: 0;
  }

  .nav-item {
    text-align: left;
  }

  .navbar-toggler {
    display: none;
  }

  main.menu-open {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .navbar-brand .logo {
    width: 40px;
  }

  .navbar-nav .nav-link,
  .navbar-nav .btn {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .navbar-brand .logo {
    width: 35px;
  }

  .navbar-nav .nav-link,
  .navbar-nav .btn {
    font-size: 0.8rem;
  }

  main {
    padding-top: 70px;
  }
}
</style>
