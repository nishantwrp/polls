<template>
  <div>
    <div :class="$style.navbartext">
      <router-link
        v-if="isselected === 'true'"
        :class="[$style.container,$style.active]"
        :to="link"
      >{{name}}</router-link>
      <router-link v-else :class="$style.container" :to="link">{{name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    name: String,
    link: String,
    isselected: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="stylus">
a {
  text-decoration: none;
  color: #00FF7F;
}

.navbartext {
  color: #00FF7F;
  font-family: 'Stylish', sans-serif;
  font-size: 25px;

  .container {
    padding: 5px;
    border: 1px solid black;
    transition: color 0.3s, background-color 0.3s, border-color 0.3s;

    &:hover {
      border-color: #00FF7F;
      color: black;
      background-color: #00FF7F;
    }
  }

  .active {
    border-color: #00FF7F;
    color: black;
    background-color: #00FF7F;
  }
}
</style>
