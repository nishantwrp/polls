<template>
  <div class="about">
    <navbar selected="3"/>
    <h3>Overview</h3>This is a responsive web application made using VueJS and Django frameworks. This application allows users to create polls and vote for polls created by them or other users.
    <br>
    <h3>Technical Stack</h3>
    <ul>
      <li>Django for backend</li>
      <li>Django Rest Framework for api</li>
      <li>VueJS for frontend</li>
      <li>Axios for api consuption</li>
      <li>Bootstrap notify.js</li>
    </ul>
    <br>By Nishant Mittal aka nishantwrp
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  }
};
</script>

