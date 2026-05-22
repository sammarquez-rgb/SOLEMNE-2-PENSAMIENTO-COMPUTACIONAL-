let esporas = [];
let fondoImg, infectadoImg;

let infectado;
let luzX, luzY;

let luzEncendida = true;
let modoEscucha = false;

let radioLuz = 270;
let contaminacion = 0;

function preload() {
  fondoImg = loadImage("fondo.png");
  infectadoImg = loadImage("infectado.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  luzX = width / 2;
  luzY = height / 2;

  infectado = {
    x: width * 0.72,
    y: height * 0.45,
    vx: 0.35,
    vy: 0.18,
    alerta: false,
    visible: 0
  };

  // SISTEMA GENERATIVO DE ESPORAS
  for (let i = 0; i < 950; i++) {
    esporas.push({
      x: random(width),
      y: random(height),
      s: random(0.7, 3.4),
      v: random(0.08, 0.5),
      a: random(TWO_PI),
      opacidad: random(35, 150)
    });
  }

  textFont("monospace");
}

function draw() {
  dibujarFondo();

  // INPUT CONTINUO
  luzX = lerp(luzX, mouseX, 0.08);
  luzY = lerp(luzY, mouseY, 0.08);

  actualizarSistema();

  dibujarEsporas();
  dibujarInfectado();

  if (luzEncendida) {
    dibujarLinterna();
  } else {
    dibujarOscuridadSinLuz();
  }

  if (modoEscucha) {
    dibujarModoEscucha();
  }

  if (infectado.alerta) {
    dibujarAlerta();
  }

  dibujarRuidoVisual();
  dibujarHUD();
}

// FONDO
function dibujarFondo() {
  let imgRatio = fondoImg.width / fondoImg.height;
  let canvasRatio = width / height;

  let w, h;

  if (canvasRatio > imgRatio) {
    w = width;
    h = width / imgRatio;
  } else {
    h = height;
    w = height * imgRatio;
  }

  image(fondoImg, (width - w) / 2, (height - h) / 2, w, h);

  noStroke();

  fill(0, 0, 0, 165);
  rect(0, 0, width, height);

  fill(8, 18, 10, 45);
  rect(0, 0, width, height);

  // Viñeta oscura
  for (let i = 0; i < 22; i++) {
    fill(0, 0, 0, i * 3);
    rect(i * 9, i * 9, width - i * 18, height - i * 18);
  }
}

// ACTUALIZACIÓN DEL SISTEMA
function actualizarSistema() {
  moverInfectado();

  let d = dist(luzX, luzY, infectado.x, infectado.y);

  infectado.alerta = luzEncendida && d < radioLuz * 0.42;

  let objetivoContaminacion = map(d, radioLuz * 1.5, 0, 20, 100);
  objetivoContaminacion = constrain(objetivoContaminacion, 20, 100);

  if (infectado.alerta) {
    objetivoContaminacion = 100;
  }

  contaminacion = lerp(contaminacion, objetivoContaminacion, 0.04);
}

// MOVIMIENTO DEL INFECTADO
function moverInfectado() {
  let movimiento = contaminacion * 0.002;

  infectado.x += infectado.vx + sin(frameCount * 0.02) * movimiento;
  infectado.y += infectado.vy + cos(frameCount * 0.015) * movimiento;

  if (infectado.x < width * 0.56 || infectado.x > width * 0.86) {
    infectado.vx *= -1;
  }

  if (infectado.y < height * 0.23 || infectado.y > height * 0.6) {
    infectado.vy *= -1;
  }
}

// ESPORAS
function dibujarEsporas() {
  noStroke();

  for (let e of esporas) {
    let d = dist(e.x, e.y, luzX, luzY);
    let enLuz = luzEncendida && d < radioLuz;

    e.x += cos(e.a) * e.v;
    e.y += sin(e.a) * e.v;
    e.a += random(-0.025, 0.025);

    if (modoEscucha) {
      e.a += sin(frameCount * 0.01) * 0.005;
    }

    if (e.x < 0) e.x = width;
    if (e.x > width) e.x = 0;
    if (e.y < 0) e.y = height;
    if (e.y > height) e.y = 0;

    if (enLuz || modoEscucha) {
      let escala = map(d, 0, radioLuz, 2.1, 0.45);
      escala = constrain(escala, 0.45, 2.1);

      fill(220, 200, 135, e.opacidad * escala);
      ellipse(e.x, e.y, e.s * escala);
    } else {
      fill(110, 120, 80, luzEncendida ? 22 : 9);
      ellipse(e.x, e.y, e.s * 0.65);
    }
  }
}

// INFECTADO
function dibujarInfectado() {
  let d = dist(luzX, luzY, infectado.x, infectado.y);

  let visibilidad = 0;

  if (luzEncendida) {
    visibilidad = map(d, 0, radioLuz + 100, 165, 0);
    visibilidad = constrain(visibilidad, 0, 165);
  }

  if (modoEscucha) {
    visibilidad = 210;
  }

  infectado.visible = lerp(infectado.visible, visibilidad, 0.08);

  push();
  translate(infectado.x, infectado.y);

  // Respiración suave
  let respiracion = 1 + sin(frameCount * 0.045) * 0.018;

  scale(respiracion);

  imageMode(CENTER);
  blendMode(SCREEN);

  if (infectado.alerta) {
    tint(220, 45, 35, infectado.visible);
  } else if (modoEscucha) {
    tint(235, 235, 220, infectado.visible);
  } else {
    tint(170, 150, 105, infectado.visible);
  }

  image(infectadoImg, 0, 0, 235, 310);

  blendMode(BLEND);
  noTint();

  pop();
}

// LINTERNA
function dibujarLinterna() {
  noStroke();

  push();
  translate(luzX, luzY);

  for (let i = 24; i > 0; i--) {
    let s = radioLuz * i * 0.115;
    let alpha = map(i, 24, 1, 1, 20);

    fill(175, 155, 95, alpha);
    ellipse(0, 0, s * 1.45, s * 0.78);
  }

  fill(250, 230, 160, 30);
  ellipse(0, 0, 52, 30);

  pop();
}

// OSCURIDAD
function dibujarOscuridadSinLuz() {
  noStroke();

  fill(0, 0, 0, 220);
  rect(0, 0, width, height);

  fill(5, 8, 5, 55);
  rect(0, 0, width, height);
}

// ALERTA
function dibujarAlerta() {
  noStroke();

  let pulso = map(sin(frameCount * 0.08), -1, 1, 8, 26);

  fill(130, 25, 18, pulso);
  rect(0, 0, width, height);

  stroke(190, 50, 35, 35);
  noFill();

  let onda = map(sin(frameCount * 0.05), -1, 1, 60, 180);
  ellipse(infectado.x, infectado.y, onda, onda);
}

// MODO ESCUCHA
function dibujarModoEscucha() {
  noStroke();

  fill(0, 0, 0, 110);
  rect(0, 0, width, height);

  fill(235, 235, 220, 38);
  rect(0, 0, width, height);

  push();
  translate(infectado.x, infectado.y);

  imageMode(CENTER);
  blendMode(SCREEN);

  tint(245, 240, 220, 150);
  image(infectadoImg, 0, 0, 250, 330);

  blendMode(BLEND);
  noTint();

  pop();

  // Líneas orgánicas
  stroke(245, 245, 230, 10);

  for (let i = 0; i < 14; i++) {
    let y = random(height);
    line(0, y, width, y + random(-5, 5));
  }
}

// RUIDO VISUAL
function dibujarRuidoVisual() {
  noStroke();

  let cantidad = map(contaminacion, 20, 100, 8, 34);

  for (let i = 0; i < cantidad; i++) {
    fill(255, random(8, 22));
    ellipse(random(width), random(height), random(0.5, 1.8));
  }
}

// HUD
function dibujarHUD() {
  noStroke();

  fill(0, 0, 0, 145);
  rect(20, 20, 300, 124, 8);

  fill(175, 155, 100);

  textSize(16);
  text("ZONA INFECTADA", 38, 50);

  textSize(12);
  text("CONTAMINACIÓN", 38, 77);

  fill(55, 65, 48);
  rect(38, 91, 220, 9);

  if (infectado.alerta) {
    fill(190, 55, 42);
  } else if (modoEscucha) {
    fill(215, 210, 180);
  } else {
    fill(135, 150, 100);
  }

  let barra = map(contaminacion, 20, 100, 35, 220);
  rect(38, 91, barra, 9);

  textSize(12);

  if (infectado.alerta) {
    fill(200, 65, 50);
    text("PELIGRO DETECTADO", 38, 125);
  } else if (modoEscucha) {
    fill(225, 220, 195);
    text("MODO ESCUCHA ACTIVO", 38, 125);
  } else {
    fill(175, 155, 100);
    text("AMBIENTE ESTABLE", 38, 125);
  }

  fill(175, 155, 100, 185);

  text("E  ESCUCHAR", 40, height - 82);
  text("L  LINTERNA [" + (luzEncendida ? "ON" : "OFF") + "]", 40, height - 52);
}

// INPUT
function keyPressed() {
  if (key === "e" || key === "E") {
    modoEscucha = !modoEscucha;
  }

  if (key === "l" || key === "L") {
    luzEncendida = !luzEncendida;
  }
}

// RESPONSIVE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  infectado.x = width * 0.72;
  infectado.y = height * 0.45;
}
