<template>
  <v-footer dark height="auto">
    <v-card flat tile class="primary flex lighten-1 white--text text-xs-center">
         <span style="color:white;">Backend Server</span>
        <a v-for="profile in profiles" :href="profile.link" target="_blank">
          <v-btn :key="profile.icon" class="mx-3 white--text" icon v-on="on">
            <v-icon size="24px">{{ profile.icon }}</v-icon>
          </v-btn>
        </a>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Source Code Of This App Is Available Here
        <a href="https://github.com/nishantwrp/polls">
          <v-btn small color="primary">GITHUB REPO</v-btn>
        </a>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019 —
        <strong>
          <a href="https://www.nishantwrp.com" target="_blank" style="color:white;">Nishant Mittal</a>
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    profiles: [
      {
        icon: "fas fa-database",
        link: "https://pollswrp.herokuapp.com/",
        tooltip: "Backend Server"
      }
    ]
  })
};
</script>
<style module lang="css">
</style>