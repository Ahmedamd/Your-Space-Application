class Signup {
  constructor() {
    this.newAcc = JSON.parse(localStorage.getItem("accounts")) || [];
    this.name = "";
    this.email = "";
    this.password = "";
    this.Accname = document.querySelector("#name");
    this.Accemail = document.querySelector("#email");
    this.Accpassword = document.querySelector("#password");
    this.btn = document.querySelector(".s-btn");
    this.form = document.querySelector("#form");
    this.EventL();
    this.saveNotes();
  }

  EventL() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();

      const name = this.Accname.value;
      const email = this.Accemail.value;
      const password = this.Accpassword.value;

      const cond = name || email || password;

      if (cond) {
        console.log(
          "condition is true and now we're talking.. lets see if we can call our function addAccount "
        );
        this.addAccount({ name, email, password });
        console.log(" yes it is ");
      }

      console.log(name, email, password);

      this.Accname.value = "";
      this.Accemail.value = "";
      this.Accpassword.value = "";

      //   this.saveNotes();
    });
  }

  addAccount({ name, email, password }) {
    const nA = {
      name,
      email,
      password,
      color: "white",
      id:
        this.newAcc.length > 0 ? this.newAcc[this.newAcc.length - 1].id + 1 : 1,
    };

    this.newAcc = [...this.newAcc, nA];
    console.log("length", this.newAcc);
    this.saveNotes();
  }

  saveNotes() {
    localStorage.setItem("accounts", JSON.stringify(this.newAcc));
  }
}

new Signup();
