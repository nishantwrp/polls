exports.loggedin = obj => {
  if (!(localStorage.getItem("loggedIn") === "true")) {
    obj.$router.push("/login");
  }
};
exports.notloggedin = obj => {
  if (localStorage.getItem("loggedIn") === "true") {
    obj.$router.push("/dashboard");
  }
};
