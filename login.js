class login {
  constructor() {
    this.newAcc = JSON.parse(localStorage.getItem("accounts")) || [];
    // this.name = "";
    this.email = "";
    this.password = "";
    this.name = "";
    // this.Accname = document.querySelector("#name");
    this.Accemail = document.querySelector("#email");
    this.Accpassword = document.querySelector("#password");
    this.btn = document.querySelector(".s-btn");
    this.form = document.querySelector("#form");
    this.EventL();
  }

  EventL() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();

      const email = this.Accemail.value;
      const password = this.Accpassword.value;

      const a = this.checkEmail(email);
      const b = this.checkPass(password);
      const c = this.Name(email);

      console.log(a, b, c);

      if (a && b) {
        var timer = setTimeout(function () {
          window.location = "./homePage.html";
        }, 2000);
      } else {
      }

      this.Accemail.value = "";
      this.Accpassword.value = "";
    });
  }

  Name(emailParam) {
    for (var i = 0; i < this.newAcc.length; i = i + 1) {
      if (emailParam === this.newAcc[i].email) {
        var name = this.newAcc[i].name;
        console.log("email matches");
        // const b = true;
        return name;
      }
    }
  }

  checkEmail(emailParam) {
    for (var i = 0; i < this.newAcc.length; i = i + 1) {
      if (emailParam === this.newAcc[i].email) {
        console.log(this.newAcc[i].email);
        console.log("email matches");
        // const b = true;
        return true;
      }
    }
  }
  //end of checkEmail fcn

  checkPass(emailPass) {
    for (var i = 0; i < this.newAcc.length; i = i + 1) {
      if (emailPass === this.newAcc[i].password) {
        console.log(this.newAcc[i].password);
        console.log("password matches");
        return true;
      }
    }
  }
}

new login();
