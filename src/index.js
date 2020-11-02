function myFunction(){
    var x = document.getElementById("createSquare");
    var y = document.getElementById("loginSquare");
    if (x.style.display === "none"){
        x.style.display = "flex";
        y.style.display = "none"
    } else {
        x.style.display = "none";
        y.style.display = "flex"
    }
}