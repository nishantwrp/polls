<template>
  <v-app>
    <Navbar />
    <v-container>
      <v-container>
        <v-layout text-xs-center wrap>
          <v-flex xl12>
            <v-breadcrumbs class="justify-center" :items="items" divider=">"></v-breadcrumbs>
            <h1
              style="color:#00c853;;font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;"
            >Polls App</h1>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-flex
          xl12
          lg12
          md12
          sm12
          xs12
          style="font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;padding:5px;"
        >
          <center>
            <p>Polls App can be used to conduct polls and to share the url of the poll with others.</p>
          </center>
        </v-flex>
      </v-container>
      <v-container>
        <v-flex
          xl12
          lg12
          md12
          sm12
          xs12
          style="font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;padding:5px;"
        >
          <center>
            <h4>
              <p v-if="isLogged === true">
                To use this app you must proceed to your
                <router-link to="/dashboard">
                  <v-btn outline color="secondary">Dashboard</v-btn>
                </router-link>
              </p>
              <p v-else>
                To use this app you must
                <router-link to="/login">
                  <v-btn outline color="secondary">Login</v-btn>
                </router-link>or
                <router-link to="/register">
                  <v-btn outline color="secondary">Register</v-btn>
                </router-link>on this app
              </p>
            </h4>
          </center>
        </v-flex>
      </v-container>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer";

export default {
  data: () => ({
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/"
      }
    ],
    isLogged: false
  }),
  components: { Navbar, Footer },
  mounted() {
    document.title = "Polls - Home Page";
    if (localStorage.getItem("loggedIn") === "true") {
      this.isLogged = true;
    }
  }
};
</script>
