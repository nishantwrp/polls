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
            >Create Polls</h1>
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
                    <v-subheader>Enter Details For Poll</v-subheader>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    outline
                    v-model="question"
                    prepend-icon="fas fa-question"
                    label="Question"
                  ></v-text-field>
                  <v-text-field
                    outline
                    v-model="option_1"
                    prepend-icon="fas fa-poll"
                    label="Option 1"
                  ></v-text-field>
                  <v-text-field
                    outline
                    v-model="option_2"
                    prepend-icon="fas fa-poll"
                    label="Option 2"
                  ></v-text-field>
                  <v-text-field
                    outline
                    v-model="option_3"
                    prepend-icon="fas fa-poll"
                    label="Option 3"
                  ></v-text-field>
                  <v-text-field
                    outline
                    v-model="option_4"
                    prepend-icon="fas fa-poll"
                    label="Option 4"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn :disabled="disabled" v-on:click="submitForm" flat color="secondary">Create</v-btn>
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
import axios from "axios"
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
        text: "Dashboard",
        disabled: false,
        href: "/dashboard"
      },
      {
        text: "Create Poll",
        disabled: false,
        href: "/create"
      }
    ],
    snackbar: false,
    color: "",
    timeout: 3000,
    text: "",
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    token: "",
    disabled: false,
    response: []
  }),
  components: { Navbar, Footer },
  mounted() {
    document.title = "Polls - Create a Poll";
    customAuth.loggedin(this);
    this.token = localStorage.getItem("token");
  },
  methods: {
    showSnackbar(color, message) {
      this.color = color;
      this.snackbar = true;
      this.text = message;
    },
    validateData() {
      if(this.question === "" || this.option_1 === "" || this.option_2 === ""|| this.option_3 === ""|| this.option_4 === "") {
        this.showSnackbar("error","Fill in all the fields");
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.validateData()) {
        this.disabled = true;
        var headers = {
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        };
        axios.post(`https://pollswrp.herokuapp.com/polls/create/`,{
          'question': this.question,
          'option_1': this.option_1,
          'option_2': this.option_2,
          'option_3': this.option_3,
          'option_4': this.option_4
        },{
          headers: headers
        }).then(result => {
          this.response = result.data;
          this.$router.push("poll/" + this.response.id);
        })
      }
    }
  }
};
</script>
