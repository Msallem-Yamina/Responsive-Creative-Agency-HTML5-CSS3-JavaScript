let cs = localStorage.getItem("color_storage");
 if(cs !== null){
    document.documentElement.style.setProperty('--main--color',cs)
         document.querySelectorAll(".colors-list li").forEach(el=>{
        el.classList.remove("active");
        if (el.dataset.color === cs){
              el.classList.add("active");
          }
     })
}
let back = true;
let inter;
 let backimg = localStorage.getItem("img-opt");
  if (backimg !== null ){
    if(backimg === "true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
        back = true;
    }else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
        back = false;}
    document.querySelectorAll(".random-backgrounds span").forEach(el=>{
        el.classList.remove("active");
     });
     if (backimg === "true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
     }else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
     }
  }
let set = document.querySelector(".toggle-sett i").onclick=function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting").classList.toggle("open")
}
document.querySelector(".reset").onclick = function () {
        // localStorage.clear();
        localStorage.removeItem("color_storage");
        localStorage.removeItem("img-opt");
        localStorage.removeItem("bullets_opt");
        window.location.reload();
}
let list = document.querySelectorAll(".colors-list li");

list.forEach(i =>{
    i.addEventListener("click",function (event) {
        document.documentElement.style.setProperty('--main--color',event.target.dataset.color)
        localStorage.setItem("color_storage",event.target.dataset.color);
        handleAct(event);
    });
});
const elback = document.querySelectorAll(".random-backgrounds span");
elback.forEach (s =>{
    s.addEventListener(("click"),(e)=>{
        handleAct(e);        
        if(e.target.dataset.background === 'yes'){
            back = true;
            randmopt();
            localStorage.setItem("img-opt","true");
        }else{
            back = false;
            clearInterval(inter);
            localStorage.setItem("img-opt","false");
        }
    });
});
let imgs = ["./1.jpg","./2.jpg","./3.jpg","./4.jpg"]
let head = document.querySelector("header")

function randmopt (){
    if(back === true){
        inter = setInterval(() => {
            let ran = Math.floor(Math.random() * imgs.length);
            head.style.backgroundImage = 'url("./'+imgs[ran]+'")';
        },8000);
    }
}
randmopt();
let shw = true;
let bull = document.querySelectorAll(".bullets-option span")
let bullstorage = localStorage.getItem("bullets_opt");
if (bullstorage !== null){
    bull.forEach(s =>{
        s.classList.remove("active");
    });
    if(bullstorage === 'block'){
        document.querySelector(".nav-bullets").style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        document.querySelector(".nav-bullets").style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bull.forEach(sp =>{
    sp.addEventListener(("click"),(e)=>{
        handleAct(e);
        if(e.target.dataset.display === 'show'){
            document.querySelector(".nav-bullets").style.display = "block";
            localStorage.setItem ("bullets_opt",'block');
        }else{
            document.querySelector(".nav-bullets").style.display = "none";
            localStorage.setItem ("bullets_opt",'none');
        }
    });
});
let skills = document.querySelector(".skills");
window.onscroll = function (){
    let skoffsettop = skills.offsetTop;
    let skouterheight = skills.offsetHeight;
    let winheight = this.innerHeight;
    let winscr = this.pageYOffset; 
    if (winscr > (skoffsettop + skouterheight - winheight)){     
      let allSkills = document.querySelectorAll(".skill .prog span");
      allSkills.forEach((span) => {
         span.style.width = span.dataset.prog;
        });
     }
}
let gal = document.querySelectorAll(".gallery img");
gal.forEach(img =>{
    img.addEventListener ('click',(e)=>{
        let overlay = document.createElement("div");
        overlay.className = "popup-img";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if(img.alt !== null){
            let headimg = document.createElement ("h3");
            let imgtext = document.createTextNode(img.alt);
            headimg.appendChild(imgtext);
            popupBox.appendChild(headimg);
        }
        let imgpop = document.createElement("img");
        imgpop.src = img.src;
        popupBox.appendChild(imgpop);
        document.body.appendChild(popupBox);
        let close = document.createElement("span");
        let colsetext = document.createTextNode("X");
        close.appendChild(colsetext);
        close.className = 'close';
        popupBox.appendChild(close);
    })
})
document.addEventListener("click",function(e){
    if(e.target.className == 'close'){
        e.target.parentNode.remove();
        // document.querySelector(".popup-box").remove();
        document.querySelector(".popup-img").remove();
    }
}) 
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach(bul =>{
    bul.addEventListener("click",e =>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    })
})
function handleAct(element){
    element.target.parentElement.querySelectorAll(".active").forEach(el =>{
        el.classList.remove("active");
    });
    element.target.classList.add("active");
}
let menu = document.querySelector(".menu");
let nav = document.querySelector("nav");
menu.onclick = function(e){
    e.stopPropagation();
    nav.classList.toggle("open");
}
document.addEventListener("click", (e)=> {
    if (e.target !== menu && e.target !== nav){
        if (nav.classList.contains("open")){
            nav.classList.remove("open");
        }
    }
});
nav.onclick = function(e){
    e.stopPropagation();
}