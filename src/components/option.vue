<template>
  <div>
    <div :class="[$style.option,ifhover]" :style="widthstyle">
      <div :class="$style.optiontext">{{ optionval }}</div>
      <div :class="[$style.votestext,ifvoted]">{{votval}} votes</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    optionval: String,
    voted: Boolean,
    votval: Number,
    covered: Number
  },
  // data() {
  //   return {
  //     widthstyle:
  //       "background: linear-gradient(to right, #00FF7F 0%, #00FF7F " +
  //       covered +
  //       "%, white " +
  //       covered +
  //       "%, white 100%);"
  //   };
  // },
  computed: {
    ifvoted() {
      // return this.voted ? "" : $style.hideit;
      if (this.voted === true) {
        return "";
      } else {
        return this.$style.hideit;
      }
    },
    ifhover() {
      if (this.voted === true) {
        return this.$style.nohover;
      } else {
        return this.$style.hovereff;
      }
    },
    widthstyle() {
      return (
        "background: linear-gradient(to right, #00FF7F 0%, #00FF7F " +
        this.covered +
        "%, white " +
        this.covered +
        "%, white 100%);"
      );
    }
  }
};
</script>
<style module lang="stylus">
.option {
  height: 70px;
  width: 90%;
  border: 1px solid black;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;

  // background: linear-gradient(to right, #00FF7F 0%, #00FF7F 60%, white 60%, white 100%);
  .optiontext {
    font-size: 20px;
    font-family: 'Stylish';
    margin-top: 24px;
    transition: color 0.2s;
  }

  .votestext {
    float: right;
    padding-top: 5px;
    font-size: 12px;
    margin-right: 5px;
  }
}

.nohover {
  &:hover {
    .optiontext {
      color: black;
    }
  }
}

.hovereff {
  &:hover {
    .optiontext {
      color: #00FF7F;
    }
  }
}

.hideit {
  display: none;
}
</style>
