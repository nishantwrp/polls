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
            >Login To Your Account</h1>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 8 : 2}`">
                <v-card-title primary-title>
                  <div>
                    <v-subheader>Enter Your Credentials</v-subheader>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-text-field v-model="email" prepend-icon="email" label="Email"></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="fas fa-lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="secondary" v-on:click="submitForm">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer";
var customAuth = require("../scripts/authentication");

export default {
  data: () => ({
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/"
      },
      {
        text: "Login",
        disabled: false,
        href: "/login"
      }
    ],
    email: "",
    password: "",
    snackbar: false,
    color: "",
    timeout: 3000,
    text: "",
    response: []
  }),
  components: { Navbar, Footer },
  methods: {
    showSnackbar(color, message) {
      this.color = color;
      this.snackbar = true;
      this.text = message;
    },
    emptyForm() {
      this.email = "";
      this.password = "";
    },
    submitForm() {
      var headers = {
        "Content-Type": "application/json"
      };
      axios
        .post(
          `https://pollswrp.herokuapp.com/auth/`,
          {
            username: this.email,
            password: this.password
          },
          { headers: headers }
        )
        .then(result => {
          this.response = result.data;
          if (this.response["message"] === "invalid_credentials") {
            this.showSnackbar("error", "Invalid Credentials");
            this.emptyForm();
          } else if (this.response["message"] === "logged_in") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("name", this.response["name"]);
            localStorage.setItem("token", this.response["token"]);
            this.emptyForm();
            this.$router.push("dashboard");
          }
        });
    }
  },
  mounted() {
    customAuth.notloggedin(this);
    document.title = "Polls - Login";
  }
};
</script>
