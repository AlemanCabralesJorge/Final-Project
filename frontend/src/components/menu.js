// src/components/menu.js

export function setupMenu() {
    const btn_menu = document.getElementById("btn_menu");
    const background_menu = document.getElementById("back_menu");
    const nav = document.getElementById("nav");
  
    if (!btn_menu || !background_menu || !nav) return;
  
    btn_menu.addEventListener("click", () => {
      nav.style.right = "0px";
      background_menu.style.display = "block";
    });
  
    background_menu.addEventListener("click", () => {
      nav.style.right = "-250px";
      background_menu.style.display = "none";
    });
    console.log("Ejecutando setupMenu");
  }
  