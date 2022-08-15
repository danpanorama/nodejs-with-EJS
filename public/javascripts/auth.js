function changPage(e) {
  e.preventDefault();

  switch (e.target.id) {
    case "login":
      document.getElementById("logli").className = "displayBlock";
      document.getElementById("logca").className = "displaynon";
      document.getElementById("logcsa").className = "displaynon";
      break;
    case "create":
      document.getElementById("logca").className = "displayBlock";
      document.getElementById("logli").className = "displaynon";
      document.getElementById("logcsa").className = "displaynon";
      break;
    case "seller":
      document.getElementById("logcsa").className = "displayBlock";
      document.getElementById("logli").className = "displaynon";
      document.getElementById("logca").className = "displaynon";
      break;
  }
}
