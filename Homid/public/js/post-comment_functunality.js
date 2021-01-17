function showAddpost(){
  document.querySelector(".AddPost").classList.replace("hide", "show");   
  document.querySelector("#addPostbutton").classList.replace("show","hide");   
  document.querySelector("#removePostbutton").classList.replace("hide", "show");   
    
  }
    function hideAddpost(){
      console.log("hide")
  document.querySelector(".AddPost").classList.replace("show","hide");   
  document.querySelector("#addPostbutton").classList.replace("hide", "show");   
  document.querySelector("#removePostbutton").classList.replace("show","hide");   
    
  }