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
            >Dashboard</h1>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <div>
          <v-tabs v-model="active" fixed-tabs slider-color="primary" color="#fafafa">
            <v-tab :key="1" ripple>Created Polls</v-tab>
            <v-tab :key="2" ripple>Participated Polls</v-tab>
            <v-tab-item :key="1">
              <v-card flat color="#fafafa">
                <v-card-text v-if="created_null" >You have not created any polls.</v-card-text>
                <v-card-text v-else>
                  <v-list >
                    <router-link v-for="obj in response.created" :to="'/poll/' + obj.id">
                    <v-list-tile  @click="" >
                      <v-list-tile-content>
              <v-list-tile-title style="font-family: 'Work Sans', sans-serif;color:black;"  >{{ obj.question }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="obj.status">
              <v-icon color="primary">fas fa-play-circle</v-icon> 
            </v-list-tile-action>
            <v-list-tile-action v-else>
              <v-icon color="error">fas fa-check-circle</v-icon> 
            </v-list-tile-action>
            <v-list-tile-action-text v-if="obj.status" style="font-size:12px;font-family:'Montserrat' ;color:black;">
              (Active)
            </v-list-tile-action-text>
            <v-list-tile-action-text v-else style="font-size:12px;font-family:'Montserrat' ;color:black;">
              (Ended)
            </v-list-tile-action-text>
                    </v-list-tile> 
                    </router-link>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item :key="2">
              <v-card flat color="#fafafa">
                <v-card-text v-if="participated_null">You have not participated in any polls.</v-card-text>
                <v-card-text v-else >
                    <v-list >
                    <router-link v-for="obj in response.participated" :to="'/poll/' + obj.id">
                    <v-list-tile  @click="" >
                      <v-list-tile-content>
              <v-list-tile-title style="font-family: 'Work Sans', sans-serif;color:black;"  >{{ obj.question }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="obj.status">
              <v-icon color="primary">fas fa-play-circle</v-icon> 
            </v-list-tile-action>
            <v-list-tile-action v-else>
              <v-icon color="error">fas fa-check-circle</v-icon> 
            </v-list-tile-action>
            <v-list-tile-action-text v-if="obj.status" style="font-size:12px;font-family:'Montserrat' ;color:black;">
              (Active)
            </v-list-tile-action-text>
            <v-list-tile-action-text v-else style="font-size:12px;font-family:'Montserrat' ;color:black;">
              (Ended)
            </v-list-tile-action-text>
                    </v-list-tile>
                    </router-link>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <div class="text-xs-center mt-3">
            <router-link to="/create">
              <v-btn color="secondary">Create Poll</v-btn>
            </router-link>
          </div>
        </div>
      </v-container>
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
        text: "Dashboard",
        disabled: false,
        href: "/dashboard"
      }
    ],
    active: null,
    token: "",
    response: [],
    created_null: false,
    participated_null: false
  }),
  components: { Navbar, Footer },
  methods: {
    getPolls() {
      var headers = {
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        };
      axios.get(`https://pollswrp.herokuapp.com/polls/`,{headers:headers}).then(result => {
        this.response = result.data;
        if (this.response.participated.length === 0 ) {
          this.participated_null = true;
        }
        if (this.response.created.length === 0 ) {
          this.created_null = true;
        }
      })

    }
  },
  mounted() {
    customAuth.loggedin(this);
    document.title = "Polls - Dashboard";
    this.token = localStorage.getItem("token");
    this.getPolls();
  }
};
</script>
