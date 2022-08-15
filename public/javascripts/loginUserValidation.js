window.addEventListener("load", (event) => {
 
    document.getElementById("createusername").addEventListener("change",(e)=>{
      console.log("hay")
      if(e.target.value.length <4 ||e.target.value.length > 20 ){
        e.target.style.border = "5px solid red"
      }else{
        e.target.style.border = "5px solid green"
      }
    })
    document.getElementById("createuserpassword").addEventListener("change",(e)=>{
      console.log("hay")
      if(e.target.value.length <8 ||e.target.value.length > 30 ){
        e.target.style.border = "5px solid red"
      }else{
        e.target.style.border = "5px solid green"
      }
    })
  
    document.getElementById("createuserPhon").addEventListener("change",(e)=>{
      console.log("hay")
      if(e.target.value.length <10 ||e.target.value.length > 10 ){
        e.target.style.border = "5px solid red"
      }else{
        e.target.style.border = "5px solid green"
      }
    })
  
  
  
  });
  
