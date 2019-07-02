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
            >{{ question }}</h1>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-hover>
              <Poll :pollId="parseInt(this.$route.params.id)"  />
            </v-hover>
             <v-subheader style="float:right;" >Created By {{ creator }}</v-subheader>  
          </v-flex>
        </v-layout>
      </v-container>
       <v-container>
        
        <center>
        <span style="padding-top:15px;font-size:14px;font-family:'Montserrat'" >
         <v-icon small color="primary">fas fa-share-alt</v-icon> Share This Poll With Others <a :href="url_of_poll" target="_blank">Copy This Link</a>
      </span>
        </center>
       
      </v-container>
      <v-container v-if="islogged === false">
        <center>
        <span style="padding-top:15px;font-size:14px;font-family:'Montserrat'" >
          You must <router-link to="/login">
                  <v-btn outline color="secondary">Login</v-btn>
                </router-link> or <router-link to="/register">
                  <v-btn outline color="secondary">Register</v-btn>
                </router-link> to vote or see results
      </span>
        </center>
      </v-container>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer";
import Poll from "../components/Poll";
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
          text: "Polls",
          disabled: true,
          href: "/"
      }
    ],
    pollId : 1,
    response: [],
    token: "",
    question: "",
    creator: "",
    islogged: true,
    url_of_poll: ""
  }),
  components: { Navbar, Footer , Poll },
  methods: {
    getInfo() {
      var headers = {
          "Content-Type": "application/json",
        };
      if (this.token !== null) {
        headers['Authorization'] = "Token " + this.token;
      }
      axios.post(`https://pollswrp.herokuapp.com/polls/questions/`,{
        'id': this.pollId
      },{headers:headers}).then(result => {
        this.response = result.data;
        // If Poll Is Not Valid
        if (this.response.message === "invalid_id") {
          this.$router.push("../404");
        }
        this.question = this.response.question;
        document.title = "Polls - " + this.question;
        this.creator = this.response.creator_name; 
      })
    }
  },
  mounted() {
    document.title = "Polls";
    this.pollId = parseInt(this.$route.params.id);
    this.token = localStorage.getItem("token");
    this.getInfo();
    if (localStorage.getItem("loggedIn") === "true"){
      this.islogged = true;
    } else {
      this.islogged = false;
    }
    this.url_of_poll = document.location;
  }
};
</script>
