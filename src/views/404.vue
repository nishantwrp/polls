<template>
  <v-app>
    <Navbar />
    <v-container>
      <v-container>
        <v-layout text-xs-center wrap>
          <v-flex xl12>
            <v-breadcrumbs class="justify-center" :items="items" divider=">"></v-breadcrumbs>
            <h1
              style="color:red;;font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;"
            >Page Not Found</h1>
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
          style="font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;padding:5px;font-size:18px;"
        >
          <center>
            <p>This is not the webpage you are looking for</p>
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
        text: "404",
        disabled: true,
        href: "/"
      }
    ],
    isLogged: false
  }),
  components: { Navbar, Footer },
  mounted() {
    document.title = "Polls - 404";
  }
};
</script>
