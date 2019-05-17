<template>
  <div class="home">
    <navbar selected="1"/>
    <center>
      <div :class="$style.maincontainer">
        <div :class="$style.centertext">Polls</div>
        <div :class="[$style.questionheads,ifquestion]">
          <div
            v-for="(polls,index) in polldata"
            :class="$style.questionhead"
            v-on:click="clickedpoll(index)"
          >
            <i class="fas fa-poll" style="color:black;"></i>
            {{polls.ques}}
          </div>
          <!-- <div :class="$style.questionhead">
            <i class="fas fa-poll" style="color:black;"></i> Vote for the next Prime Minister
          </div>
          <div :class="$style.questionhead">
            <i class="fas fa-poll" style="color:black;"></i> Who will sit on the iron throne?
          </div>-->
        </div>
        <div :class="[$style.loading,ifloading]">
          <img src="@/assets/infinity.svg">
        </div>
        <div :class="[$style.votesection,ifvotesection]">
          <div :class="$style.backbtn" v-on:click="backpressed()">
            <i class="fas fa-chevron-left"></i> Back
          </div>
          <div :class="$style.questiontext">{{ clickedquestion }}</div>
          <div :class="$style.options">
            <span v-on:click="optionclicked(1)">
              <optioned
                :optionval="opt1txt"
                :voted="!optionclickable"
                :votval="opt1val"
                :covered="opt1per"
              />
            </span>
            <span v-on:click="optionclicked(2)">
              <optioned
                :optionval="opt2txt"
                :voted="!optionclickable"
                :votval="opt2val"
                :covered="opt2per"
              />
            </span>
            <span v-on:click="optionclicked(3)">
              <optioned
                :optionval="opt3txt"
                :voted="!optionclickable"
                :votval="opt3val"
                :covered="opt3per"
              />
            </span>
            <span v-on:click="optionclicked(4)">
              <optioned
                :optionval="opt4txt"
                :voted="!optionclickable"
                :votval="opt4val"
                :covered="opt4per"
              />
            </span>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import axios from "axios";
import optioned from "@/components/option.vue";
export default {
  name: "home",
  components: {
    navbar,
    optioned
  },
  data() {
    return {
      polldata: [],
      votesectionshow: 0,
      loadingsectionshow: 0,
      questionsectionshow: 0,
      clickpollindex: 0,
      clickedquestion: "",
      opt1txt: "",
      opt2txt: "",
      opt3txt: "",
      opt4txt: "",
      opt1val: 0,
      opt2val: 0,
      opt3val: 0,
      opt4val: 0,
      opt1per: 0,
      opt2per: 0,
      opt3per: 0,
      opt4per: 0,
      optionclickable: true,
      multipleclick: true
    };
  },
  mounted() {
    this.loadingsectionshow = 1;
    axios
      .get(`https://pollswrp.herokuapp.com/questions/`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.polldata = response.data;
        this.loadingsectionshow = 0;
        this.questionsectionshow = 1;
      })
      .catch(e => {
        console.log(e);
      });
  },
  computed: {
    ifquestion() {
      return this.questionsectionshow ? "" : this.$style.hideit;
    },
    ifloading() {
      return this.loadingsectionshow ? "" : this.$style.hideit;
    },
    ifvotesection() {
      return this.votesectionshow ? "" : this.$style.hideit;
    }
  },
  methods: {
    clickedpoll(pollindex) {
      this.clickpollindex = pollindex;
      this.clickedquestion = this.polldata[pollindex].ques;
      this.opt1txt = this.polldata[pollindex].opt1;
      this.opt2txt = this.polldata[pollindex].opt2;
      this.opt3txt = this.polldata[pollindex].opt3;
      this.opt4txt = this.polldata[pollindex].opt4;
      this.questionsectionshow = 0;
      this.votesectionshow = 1;
      this.optionclickable = true;
      this.multipleclick = true;
      this.opt1per = 0;
      this.opt2per = 0;
      this.opt3per = 0;
      this.opt4per = 0;
    },
    backpressed() {
      this.questionsectionshow = 1;
      this.votesectionshow = 0;
    },
    optionclicked(optno) {
      if (this.optionclickable && this.multipleclick) {
        this.multipleclick = false;
        if (optno === 1) {
          this.polldata[this.clickpollindex].vot1 += 1;
        } else if (optno === 2) {
          this.polldata[this.clickpollindex].vot2 += 1;
        } else if (optno === 3) {
          this.polldata[this.clickpollindex].vot3 += 1;
        } else if (optno === 4) {
          this.polldata[this.clickpollindex].vot4 += 1;
        }
        var apiurl =
          "https://pollswrp.herokuapp.com/questions/" +
          this.polldata[this.clickpollindex].id +
          "/";
        var tmp = this.polldata[this.clickpollindex];
        axios
          .put(apiurl, {
            ques: tmp.ques,
            opt1: tmp.opt1,
            opt2: tmp.opt2,
            opt3: tmp.opt3,
            opt4: tmp.opt4,
            vot1: tmp.vot1,
            vot2: tmp.vot2,
            vot3: tmp.vot3,
            vot4: tmp.vot4
          })
          .then(response => {
            iziToast.show({
              title: "Success",
              message: "Vote Recorded",
              color: "green",
              position: "bottomCenter",
              icon: "fas fa-check"
            });
            console.log("Vote Recorded");
            this.opt1val = tmp.vot1;
            this.opt2val = tmp.vot2;
            this.opt3val = tmp.vot3;
            this.opt4val = tmp.vot4;
            this.optionclickable = false;
            var totalvotes = tmp.vot1 + tmp.vot2 + tmp.vot3 + tmp.vot4;
            this.opt1per = Math.ceil((tmp.vot1 / totalvotes) * 100);
            this.opt2per = Math.ceil((tmp.vot2 / totalvotes) * 100);
            this.opt3per = Math.ceil((tmp.vot3 / totalvotes) * 100);
            this.opt4per = Math.ceil((tmp.vot4 / totalvotes) * 100);
            // console.log(Math.ceil((tmp.vot1 / totalvotes) * 100));
          })
          .catch(e => {
            console.log(e);
            if (optno === 1) {
              this.polldata[this.clickpollindex].vot1 -= 1;
            } else if (optno === 2) {
              this.polldata[this.clickpollindex].vot2 -= 1;
            } else if (optno === 3) {
              this.polldata[this.clickpollindex].vot3 -= 1;
            } else if (optno === 4) {
              this.polldata[this.clickpollindex].vot4 -= 1;
            }
            iziToast.show({
              title: "Error",
              message: "Could not register your vote",
              color: "red",
              position: "bottomCenter",
              icon: "fas fa-exclamation-circle"
            });
            this.multipleclick = true;
            //Error during Vote
          });
      } else {
        console.log("Already Voted");
        iziToast.show({
          title: "Warning",
          message: "You have voted already",
          color: "yellow",
          position: "bottomCenter",
          icon: "fas fa-exclamation-triangle"
        });
        //Voted Already
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
}

.backbtn {
  color: #00FF7F;
  float: left;
  font-family: 'Stylish';
  font-size: 15px;
  padding: 5px;
  // background-color: black;
  margin-left: 5px;
  border: 2px solid #00FF7F;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #00FF7F;
    color: black;
  }
}

.questionheads {
  .questionhead {
    padding: 10px;
    max-width: 500px;
    text-overflow: ellipsis;

    &:hover {
      // background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      background-color: #00FF7F;
    }
  }
}

// .votesection {
// display: none;
// }

// .loading {
// display: none;
// }
.questiontext {
  padding: 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 20px;
}

@media only screen and (max-width: 510px) {
  .maincontainer {
    width: 100%;
    border: none;
    overflow: none;
  }
}

.hideit {
  display: none;
}
</style>
