<template>
  <div class="create">
    <navbar selected="2"/>
    <center>
      <div :class="$style.maincontainer">
        <div :class="$style.centertext">Create a Poll</div>
        <form>
          <input :class="$style.inputbox" placeholder="Question" v-model="inques">
          <input :class="$style.inputbox" placeholder="Option 1" v-model="inopt1">
          <input :class="$style.inputbox" placeholder="Option 2" v-model="inopt2">
          <input :class="$style.inputbox" placeholder="Option 3" v-model="inopt3">
          <input :class="$style.inputbox" placeholder="Option 4" v-model="inopt4">
          <br>
          <button :class="$style.buttonbox" v-on:click="senddata()">Create</button>
        </form>
      </div>
    </center>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    navbar
  },
  data() {
    return {
      inques: "",
      inopt1: "",
      inopt2: "",
      inopt3: "",
      inopt4: ""
    };
  },
  methods: {
    senddata() {
      if (
        this.inques.length === 0 ||
        this.inopt1.length === 0 ||
        this.inopt2 === "" ||
        this.inopt3 === "" ||
        this.inopt4 === ""
      ) {
        iziToast.show({
          title: "Error",
          message: "Please fill all the fields",
          color: "red",
          position: "bottomCenter",
          icon: "fas fa-exclamation-circle"
        });
        console.log("Please Fill All The Fields");
      } else {
        if (
          this.inques.length > 50 ||
          this.inopt1.length > 50 ||
          this.inopt2 > 50 ||
          this.inopt3 > 50 ||
          this.inopt4 > 50
        ) {
          iziToast.show({
            title: "Error",
            message: "No more than 50 characters allowed in each of the field",
            color: "red",
            position: "bottomCenter",
            icon: "fas fa-exclamation-circle"
          });
          console.log(
            "No more than 50 characters allowed in each of the field"
          );
        } else {
          // Real Code
          axios
            .post(`https://pollswrp.herokuapp.com/questions/`, {
              ques: this.inques,
              opt1: this.inopt1,
              opt2: this.inopt2,
              opt3: this.inopt3,
              opt4: this.inopt4,
              vot1: 0,
              vot2: 0,
              vot3: 0,
              vot4: 0
            })
            .then(response => {
              iziToast.show({
                title: "Success",
                message: "Poll Created",
                color: "green",
                position: "bottomCenter",
                icon: "fas fa-check"
              });
              this.inques = "";
              this.inopt1 = "";
              this.inopt2 = "";
              this.inopt3 = "";
              this.inopt4 = "";
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    }
  }
};
</script>
<style module lang="stylus">
.maincontainer {
  margin-top: 20px;
  height: 500px;
  width: 500px;
  border: 1px solid silver;
  overflow: auto;

  .centertext {
    color: #00FF7F;
    padding: 10px;
    font-size: 20px;
    font-family: sans-serif;
  }

  .inputbox {
    margin-top: 25px;
    padding: 10px;
    width: 300px;
    border: none;
    font-size: 15px;
    border: 1px solid grey;
    transition: border 0.3s;

    &:focus {
      border: 1px solid #00FF7F;
    }
  }

  .buttonbox {
    box-sizing: content-box;
    cursor: pointer;
    padding: 10px;
    width: 300px;
    color: #00FF7F;
    font-family: 'Stylish';
    font-size: 16px;
    margin-top: 25px;
    background: none;
    border: 2px solid #00FF7F;
    transition: background-color 0.3s, color 0.3s;

    &:focus, &:hover {
      background-color: #00FF7F;
      color: black;
    }
  }
}

@media only screen and (max-width: 510px) {
  .maincontainer {
    width: 100%;
    border: none;
    overflow: none;
  }

  .inputbox, .buttonbox {
    width: 250px !important;
  }
}
</style>
