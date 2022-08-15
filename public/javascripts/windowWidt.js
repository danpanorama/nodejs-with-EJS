window.addEventListener("load", (event) => {
 
  document.getElementById("addwindow").addEventListener("change",(e)=>{
    console.log("hay")
    if(e.target.value.length <20){
      e.target.style.border = "5px solid red"
    }else{
      e.target.style.border = "5px solid green"
    }

  })




});
