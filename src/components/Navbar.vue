<template>
  <v-toolbar style="background: #fafafa;" flat>
    <router-link to="/">
      <v-toolbar-title :class="$style.navTitle">Polls</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <!-- If The User Is Not Logged In -->
    <div :style="this.isNotLoggedIn">
      <div v-show="$vuetify.breakpoint.smAndUp">
        <router-link to="/register">
          <v-btn color="primary">Register</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn color="primary">Login</v-btn>
        </router-link>
      </div>
      <div v-show="$vuetify.breakpoint.xsOnly">
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" style="color:#00c853;">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click>
              <router-link :to="item.link">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </router-link>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
    <!-- If The User Is Logged In  -->
    <div :style="this.isLoggedIn">
      <div v-show="$vuetify.breakpoint.smAndUp">
        <router-link to="/dashboard">
          <v-btn outline color="primary">
            <v-icon dark left>fas fa-user-tie</v-icon>
            {{ name }}
          </v-btn>
        </router-link>
        <router-link to="/password">
          <v-btn outline color="primary">
            <v-icon dark left>fas fa-key</v-icon>Change Password
          </v-btn>
        </router-link>
        <v-btn outline color="primary" v-on:click="signOut">
          <v-icon dark left>fas fa-sign-out-alt</v-icon>Logout
        </v-btn>
      </div>
      <div v-show="$vuetify.breakpoint.xsOnly">
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" style="color:#00c853;">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile :key="1" @click>
              <router-link to="/dashboard">
                <v-list-tile-title>{{ name }}</v-list-tile-title>
              </router-link>
            </v-list-tile>
            <v-list-tile :key="2" @click>
              <router-link to="/password">
                <v-list-tile-title>Change Password</v-list-tile-title>
              </router-link>
            </v-list-tile>
            <v-list-tile :key="3" v-on:click="signOut">
              <v-list-tile-title style="color:#00c853;">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
    <!-- Ending Tags -->
  </v-toolbar>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    name: "",
    token: "",
    items: [
      { title: "Register", link: "/register" },
      { title: "Login", link: "/login" }
    ],
    response: []
  }),
  computed: {
    isNotLoggedIn() {
      var tmp = localStorage.getItem("loggedIn");
      if (tmp === "true") {
        return "display:none";
      } else {
        return "";
      }
    },
    isLoggedIn() {
      var tmp = localStorage.getItem("loggedIn");
      if (tmp === "true") {
        return "";
      } else {
        return "display:none";
      }
    },
    userName() {
      this.name = localStorage.getItem("name");
      return localStorage.getItem("name");
    }
  },
  mounted() {
    this.name = localStorage.getItem("name");
    this.token = localStorage.getItem("token");
  },
  methods: {
    signOut() {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + this.token
      };
      axios
        .get(`https://pollswrp.herokuapp.com/auth/logout/`, {
          headers: headers
        })
        .then(result => {
          this.response = result.data;
          if (this.response["message"] === "logged_out") {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("loggedIn");
            this.$router.push("/");
          }
        });
    }
  }
};
</script>
<style module lang="stylus">
.navTitle {
  font-family: 'Mali', cursive;
  font-size: 25px;
  color: #00c853;
}
</style>
