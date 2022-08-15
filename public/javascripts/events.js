window.addEventListener("load", (event) => {
  let x = false;

  let button = document.querySelectorAll(".updateButton");
  button.forEach((item) => {
    item.addEventListener("click", function showForm(e) {
      e.preventDefault();
      if (x == false) {
        document.querySelectorAll(".hiddneformUpdate").forEach((item) => {
          item.style.width = "100%";
          item.style.display = "block";
        });

        x = true;
      } else {
        document.querySelectorAll(".hiddneformUpdate").forEach((item) => {
          item.style.width = "0";
          item.style.display = "none";
        });
        x = false;
      }
    });
  });
});
