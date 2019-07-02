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
            >Create An Account</h1>
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
                    <v-subheader>Enter Your Details Below</v-subheader>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-layout>
                    <v-flex xs-6 sm-6 md-6 xl-6 lg-6>
                      <v-text-field
                        v-model="first_name"
                        prepend-icon="fas fa-signature"
                        label="First Name"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs-6 sm-6 md-6 xl-6 lg-6>
                      <v-text-field v-model="last_name" label="Last Name"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-text-field v-model="email" prepend-icon="email" label="Email"></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="fas fa-lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="password_again"
                    prepend-icon="fas fa-lock"
                    label="Password Again"
                    type="password"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :disabled="disabled"
                    v-on:click="submitForm"
                    flat
                    color="secondary"
                  >Register</v-btn>
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
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer";
import axios from "axios";
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
        text: "Register",
        disabled: false,
        href: "/register"
      }
    ],
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_again: "",
    snackbar: false,
    color: "",
    timeout: 3000,
    text: "",
    response: [],
    disabled: false
  }),
  components: { Navbar, Footer },
  methods: {
    showSnackbar(color, message) {
      this.color = color;
      this.snackbar = true;
      this.text = message;
    },
    emptyForm() {
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.password = "";
      this.password_again = "";
    },
    validateData() {
      if (
        this.first_name === "" ||
        this.last_name === "" ||
        this.email === "" ||
        this.password === ""
      ) {
        this.showSnackbar("error", "Please fill all the fields");
        return false;
      }
      if (this.password !== this.password_again) {
        this.showSnackbar("error", "Passwords do not match");
        return false;
      }
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

      if (expression.test(String(this.email).toLowerCase())) {
        return true;
      } else {
        this.showSnackbar("error", "Enter a valid email address");
        return false;
      }
    },

    submitForm() {
      if (this.validateData()) {
        var headers = {
          "Content-Type": "application/json"
        };
        axios
          .post(
            `https://pollswrp.herokuapp.com/auth/register/`,
            {
              first_name: this.first_name,
              last_name: this.last_name,
              username: this.email,
              password: this.password
            },
            { headers: headers }
          )
          .then(
            result => {
              this.response = result.data;
              if (this.response["message"] === "email_already_exists") {
                this.showSnackbar(
                  "info",
                  "Another User With Same Email Already Exists"
                );
                this.emptyForm();
              } else if (this.response["message"] === "user_registered") {
                this.showSnackbar("success", "User Registered");
                this.emptyForm();
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("name", this.response["name"]);
                localStorage.setItem("token", this.response["token"]);
                this.$router.push("dashboard");
              }
            },
            error => {
              console.error(error);
            }
          );
      }
    }
  },
  mounted() {
    customAuth.notloggedin(this);
    document.title = "Polls - Register";
  }
};
</script>
