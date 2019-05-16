<template>
  <div class="hello">
    <center>
      <table cellpadding="5px">
        <tr>
          <td>
            <navbarblock v-if="selected === '1'" name="Polls" link="/" isselected="true"/>
            <navbarblock v-else name="Polls" link="/"/>
          </td>
          <td>
            <navbarblock v-if="selected === '2'" name="Create" link="/create/" isselected="true" />
            <navbarblock v-else name="Create" link="/create/" />
          </td>
          <td>
            <navbarblock v-if="selected === '3'" name="About" link="/about/" isselected="true" />
             <navbarblock v-else name="About" link="/about/" />
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import navbarblock from "./navbar-block";
export default {
  name: "navbar",
  components: {
    navbarblock
  },
  props: {
    selected: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
