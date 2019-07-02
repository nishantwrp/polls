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
            >Change Your Password</h1>
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
                    <v-subheader>Enter The Following Details</v-subheader>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-text-field v-model="current_password" type="password" label="Current Password"></v-text-field>
                  <v-text-field v-model="new_password" label="New Password" type="password"></v-text-field>
                  <v-text-field
                    v-model="new_password_again"
                    label="New Password Again"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="secondary" v-on:click="submitForm">Change Password</v-btn>
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
        text: "Change Password",
        disabled: false,
        href: "/password"
      }
    ],
    current_password: "",
    new_password: "",
    new_password_again: "",
    snackbar: false,
    color: "",
    timeout: 3000,
    text: "",
    response: [],
    token: ""
  }),
  components: { Navbar, Footer },
  methods: {
    showSnackbar(color, message) {
      this.color = color;
      this.snackbar = true;
      this.text = message;
    },
    emptyForm() {
      this.current_password = "";
      this.new_password = "";
      this.new_password_again = "";
    },
    validateForm() {
      if (this.new_password !== this.new_password_again) {
        this.showSnackbar("error", "Passwords Do Not Match");
        return false;
      }
      if (this.new_password === "") {
        this.showSnackbar("error", "Enter A New Password");
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.validateForm()) {
        var headers = {
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        };
        axios
          .post(
            `https://pollswrp.herokuapp.com/auth/password/`,
            {
              current_password: this.current_password,
              new_password: this.new_password
            },
            { headers: headers }
          )
          .then(result => {
            this.response = result.data;
            if (this.response["message"] === "invalid_password") {
              this.showSnackbar("error", "Invalid Password");
              this.emptyForm();
            } else if (this.response["message"] === "password_changed") {
              this.showSnackbar("success", "Password Successfully Changed");
              this.emptyForm();
            }
          });
      }
    }
  },
  mounted() {
    customAuth.loggedin(this);
    document.title = "Polls - Change Your Password";
    this.token = localStorage.getItem("token");
  }
};
</script>
