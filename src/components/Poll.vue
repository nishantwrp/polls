<template>
 <!-- If Person Has Not Voted For This Poll -->
<v-card v-if="hideit === false" >
                <v-card-text>
         <v-radio-group v-model="choice" >
      <v-radio
      :disabled="!islogged"
       key="1"
       :value="1"
       style="padding:5px;"
       :label="response.option_1"
      ></v-radio>
     
      <v-radio
       key="2"
       :value="2"
       :disabled="!islogged"
       :label="response.option_2"
       style="padding:5px;"
      ></v-radio>
       <v-radio
       key="3"
       :value="3"
       :disabled="!islogged"
       style="padding:5px;"
       :label="response.option_3"
      ></v-radio>
       <v-radio
       key="4"
       :value="4"
       :disabled="!islogged"
       style="padding:5px;"
       :label="response.option_4"
      ></v-radio>
    </v-radio-group>
                </v-card-text>
               <v-card-actions>
                   <v-btn :disabled="!islogged" v-on:click="submitVote" flat color="secondary" >Vote</v-btn>
               </v-card-actions>
               <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
              </v-card> 
              
              <v-card v-else-if="closedAndNotLogged === true">
                <v-card-text>
                   <span :class="$style.option" style="padding-top:0px;"> This Poll Has Ended </span>
                </v-card-text>
              
              </v-card>
              <v-card v-else-if="endedandnotvoted === true">
                <v-card-text>
                   <span :class="$style.option" style="padding-top:0px;">This Poll Has Ended. You have not participated in this poll so you can't view it's results.</span>
                </v-card-text>
              
              </v-card>
              <!-- If User Has Already Voted For This Poll -->
              <v-card v-else>
                    <v-card-text>
                     <span :class="$style.option"> {{ response.option_1 }} </span>
                         <v-progress-linear
      color="secondary"
      height="10"
      :value="votes_a"
    ></v-progress-linear> <span :class="$style.votes">{{ votes_response.votes_1 }} Votes</span>
    <v-divider></v-divider>
     <span :class="$style.option"> {{ response.option_2 }} </span>
                         <v-progress-linear
      color="secondary"
      height="10"
      :value="votes_b"
    ></v-progress-linear> <span :class="$style.votes">{{ votes_response.votes_2 }} Votes</span>
    <v-divider></v-divider>
    <span :class="$style.option"> {{ response.option_3 }} </span>
                         <v-progress-linear
      color="secondary"
      height="10"
      :value="votes_c"
    ></v-progress-linear> <span :class="$style.votes">{{ votes_response.votes_3 }} Votes</span>
    <v-divider></v-divider>
    <span :class="$style.option"> {{ response.option_4 }} </span>
                         <v-progress-linear
      color="secondary"
      height="10"
      :value="votes_d"
    ></v-progress-linear> <span :class="$style.votes">{{ votes_response.votes_4 }} Votes</span>
    <v-divider></v-divider>
                </v-card-text>
                <v-card-actions>
                  <v-btn :disabled="!response.status" v-if="is_owner === true" flat color="secondary" v-on:click="endPoll" >
                    <span v-if="response.status === true">
                      End Poll
                    </span>
                    <span v-else>
                      Poll Ended
                    </span>
                  </v-btn>
                </v-card-actions>
               
              </v-card>
              
</template>
<script>
import axios from "axios";
export default {
    props: {
        pollId : {
            type: Number,
            required: true
        }
    },
    data() {
        return {
        snackbar: false,
        color: "",
        timeout: 3000,
        text: "",
        choice: 0,
        islogged: false,
        token: "",
        response:[],
        votes_response:[],
        hideit: false,
        closedAndNotLogged: false,
        votes_a: 0,
        votes_b: 0,
        votes_c: 0,
        votes_d: 0,
        is_owner: false,
        vote_response:[],
        endedandnotvoted: false
        }
    },
    methods: {
      showSnackbar(color, message) {
        this.color = color;
        this.snackbar = true;
        this.text = message;
      },
      endPoll() {
        var headers = {
          "Content-Type": "application/json",
          'Authorization': "Token " + this.token
        };
        axios.post(`https://pollswrp.herokuapp.com/polls/end/`,{
          'id': this.pollId
        },{headers:headers}).then(result => {
          if(result.data.message === "poll_ended") {
            this.response.status = false;
          }
        })
      },
      submitVote() {
        if (this.choice === 0) {
          this.showSnackbar("error","Choose A Option");
        } else {
          var headers = {
          "Content-Type": "application/json",
          'Authorization': "Token " + this.token
          };
          axios.post(`https://pollswrp.herokuapp.com/polls/vote/`,{
            'id': this.pollId,
            'choice': this.choice
          },{headers:headers}).then(result => {
            this.vote_response = result.data;
            if (this.vote_response.message === "vote_recorded") {
              this.showSnackbar("success","Vote Recorded");
              this.hideit = true;
              this.getVotes();
            }
          })
        }
      },
      getVotes() {
        if (this.islogged === false && this.response.status === false) {
          this.closedAndNotLogged = true;
        } else {
          var headers = {
          "Content-Type": "application/json",
          'Authorization': "Token " + this.token
          };
          axios.post(`https://pollswrp.herokuapp.com/polls/votes/`,{
            'id': this.pollId
          },{headers:headers}).then(result => {
            this.votes_response = result.data;
            if (result.data.message === "not_voted") {
              this.endedandnotvoted = true;
            } else {
              this.endedandnotvoted = false;
            }
            var sum_votes = this.votes_response.votes_1 + this.votes_response.votes_2 + this.votes_response.votes_3 + this.votes_response.votes_4;
            if (sum_votes > 0) {
              this.votes_a = (this.votes_response.votes_1 / sum_votes)*100;
              this.votes_b = (this.votes_response.votes_2 / sum_votes)*100;
              this.votes_c = (this.votes_response.votes_3 / sum_votes)*100;
              this.votes_d = (this.votes_response.votes_4 / sum_votes)*100;
            }
            if (this.votes_response.is_owner === true) {
              this.is_owner = true;
            } else {
              this.is_owner = false;
            }
          })
        }
      },
      getQuestions() {
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
        if (this.response.status === false || this.response.voted === true) {
          this.hideit = true;
          this.getVotes();
        }
      })
      }
    },
    mounted() {
      if (localStorage.getItem("loggedIn") === "true"){
        this.islogged = true;
      }
      this.token = localStorage.getItem("token");
      this.getQuestions();
      
    } 
}
</script>
<style module lang="css">
.option {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: green;
    font-family: 'Montserrat';
    min-height: 30px;
    font-size: 18px;
    padding: 0 10px 0 10px;
    padding-top: 25px;
}
.votes {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box; 
    display: -ms-flexbox;
    float:right;
    display: flex;
    color: grey;
    font-family: 'Montserrat';
    height: 20px;
    font-size: 12px;
    padding: 0 10px 20px 10px;
    padding-top: 0px;
}
</style>
