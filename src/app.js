
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

/* crear input  */
const container = document.querySelector('.container')
const formulario = document.querySelector('#formulario')
const inputform = document.createElement('input')
const btnDraw = document.createElement('button')
const btnSort = document.createElement('button')

const simbolos = ["♠", "♥", "♦", "♣"]
const valores = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
let cartasArray = []

btnDraw.textContent = "Draw"
btnSort.textContent = "Sort"
formulario.textContent = "Cantidad de Cartas:"
formulario.appendChild(inputform)
formulario.appendChild(btnDraw)
formulario.appendChild(btnSort)

btnDraw.addEventListener("click", () => {
  container.innerHTML = ""
  ordenadas.innerHTML = "";
  cartasArray = [];

  const cantidad = parseInt(inputform.value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor ingresa un número válido.");
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];
    const valor = valores[Math.floor(Math.random() * valores.length)];
    cartasArray.push({ simbolo, valor });
    const cartaHTML = crearCarta(simbolo, valor);
    container.appendChild(cartaHTML);
  }
});

function crearCarta(simbolo, valor) {
  const carta = document.createElement('div');
  carta.classList.add('carta');

  const pintaTop = document.createElement('div');
  pintaTop.classList.add('pintaTop');
  pintaTop.textContent = simbolo;

  const number = document.createElement('div');
  number.classList.add('number');
  number.textContent = valor;

  const pintaBack = document.createElement('div');
  pintaBack.classList.add('pintaBack');
  pintaBack.textContent = simbolo;

  if (simbolo === "♥" || simbolo === "♦") {
    pintaTop.style.color = "red";
    pintaBack.style.color = "red";
    number.style.color = "red";
  }

  carta.appendChild(pintaTop);
  carta.appendChild(number);
  carta.appendChild(pintaBack);

  return carta;
}

btnSort.addEventListener("click", () => {
  ordenadas.innerHTML = ""; 
  let array = [...cartasArray];

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (valorNumerico(array[j].valor) < valorNumerico(array[minIndex].valor)) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Intercambiar la carta actual con la de valor mínimo encontrado
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      // Mostrar paso visual
      const paso = document.createElement("div");
      paso.style.display = "flex";
      paso.style.marginBottom = "10px";

      array.forEach(carta => {
        const cartaHTML = crearCarta(carta.simbolo, carta.valor);
        paso.appendChild(cartaHTML);
      });

      ordenadas.appendChild(paso);
    }
  }
});

function valorNumerico(valor) {
  if (valor === "A") return 1;
  if (valor === "J") return 11;
  if (valor === "Q") return 12;
  if (valor === "K") return 13;
  return parseInt(valor);
}


