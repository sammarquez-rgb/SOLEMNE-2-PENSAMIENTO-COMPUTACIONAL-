let esporas = [];

let fondoImg;
let infectadoImg;

let infectado;
let luzX, luzY;

let luzEncendida = true;
let modoEscucha = false;

let radioLuz = 270;

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
    vx: 0.25,
    vy: 0.12,
    alerta: false
  };

  for (let i = 0; i < 900; i++) {
    esporas.push({
      x: random(width),
      y: random(height),
      s: random(0.8, 3.2),
      v: random(0.08, 0.45),
      a: random(TWO_PI),
      b: random(40, 150)
    });
  }
}

function draw() {
  dibujarFondo();

  luzX = lerp(luzX, mouseX, 0.08);
  luzY = lerp(luzY, mouseY, 0.08);

  dibujarEsporas();
  dibujarInfectado();

  if (luzEncendida) {
    dibujarLinterna();
  } else {
    dibujarOscuridadSinLuz();
  }

  if (infectado.alerta) {
    dibujarAlerta();
  }

  if (modoEscucha) {
    dibujarModoEscucha();
  }

  dibujarHUD();
}

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

  fill(0, 0, 0, 170);
  rect(0, 0, width, height);

  fill(5, 15, 10, 45);
  rect(0, 0, width, height);

  for (let i = 0; i < 18; i++) {
    fill(0, 0, 0, i * 3);
    rect(i * 10, i * 10, width - i * 20, height - i * 20);
  }
}

function dibujarEsporas() {
  noStroke();

  for (let e of esporas) {
    let d = dist(e.x, e.y, luzX, luzY);
    let enLuz = luzEncendida && d < radioLuz;

    e.x += cos(e.a) * e.v;
    e.y += sin(e.a) * e.v;
    e.a += random(-0.02, 0.02);

    if (e.x < 0) e.x = width;
    if (e.x > width) e.x = 0;
    if (e.y < 0) e.y = height;
    if (e.y > height) e.y = 0;

    if (enLuz || modoEscucha) {
      let f = map(d, 0, radioLuz, 1.9, 0.4);
      f = constrain(f, 0.4, 1.9);

      fill(220, 200, 130, e.b * f);
      ellipse(e.x, e.y, e.s * f);
    } else {
      fill(115, 120, 80, luzEncendida ? 20 : 10);
      ellipse(e.x, e.y, e.s * 0.6);
    }
  }
}

function dibujarInfectado() {
  infectado.x += infectado.vx + sin(frameCount * 0.02) * 0.2;
  infectado.y += infectado.vy + cos(frameCount * 0.015) * 0.14;

  if (infectado.x < width * 0.58 || infectado.x > width * 0.85) {
    infectado.vx *= -1;
  }

  if (infectado.y < height * 0.25 || infectado.y > height * 0.58) {
    infectado.vy *= -1;
  }

  let d = dist(luzX, luzY, infectado.x, infectado.y);

  infectado.alerta = luzEncendida && d < radioLuz * 0.45;

  let vis = 0;

  if (luzEncendida) {
    vis = map(d, 0, radioLuz + 100, 145, 0);
    vis = constrain(vis, 0, 145);
  }

  if (modoEscucha) {
    vis = 190;
  }

  push();
  translate(infectado.x, infectado.y);

  let breathe = 1 + sin(frameCount * 0.04) * 0.015;
  scale(breathe);

  imageMode(CENTER);
  blendMode(SCREEN);

  if (infectado.alerta) {
    tint(200, 60, 45, vis);
  } else if (modoEscucha) {
    tint(240, 235, 220, vis);
  } else {
    tint(170, 150, 100, vis);
  }

  image(infectadoImg, 0, 0, 230, 305);

  blendMode(BLEND);
  noTint();
  pop();
}

function dibujarLinterna() {
  noStroke();

  push();
  translate(luzX, luzY);

  for (let i = 22; i > 0; i--) {
    let s = radioLuz * i * 0.12;
    let alpha = map(i, 22, 1, 1.2, 18);

    fill(170, 150, 92, alpha);
    ellipse(0, 0, s * 1.4, s * 0.75);
  }

  fill(245, 225, 155, 28);
  ellipse(0, 0, 48, 28);

  pop();
}

function dibujarOscuridadSinLuz() {
  noStroke();

  fill(0, 0, 0, 215);
  rect(0, 0, width, height);

  fill(4, 7, 5, 45);
  rect(0, 0, width, height);
}

function dibujarAlerta() {
  noStroke();

  let pulso = map(sin(frameCount * 0.07), -1, 1, 8, 20);

  fill(120, 30, 20, pulso);
  rect(0, 0, width, height);
}

function dibujarModoEscucha() {
  noStroke();

  fill(0, 0, 0, 105);
  rect(0, 0, width, height);

  fill(235, 235, 220, 42);
  rect(0, 0, width, height);

  push();
  translate(infectado.x, infectado.y);
  imageMode(CENTER);
  blendMode(SCREEN);
  tint(245, 240, 220, 145);
  image(infectadoImg, 0, 0, 240, 320);
  blendMode(BLEND);
  noTint();
  pop();

  stroke(245, 245, 230, 8);
  for (let i = 0; i < 12; i++) {
    let y = random(height);
    line(0, y, width, y + random(-4, 4));
  }
}

function dibujarHUD() {
  noStroke();

  let d = dist(luzX, luzY, infectado.x, infectado.y);

  let nivelContaminacion = map(d, radioLuz * 1.4, 0, 35, 200);
  nivelContaminacion = constrain(nivelContaminacion, 35, 200);

  fill(0, 0, 0, 135);
  rect(20, 20, 280, 110, 8);

  fill(170, 155, 100);
  textSize(16);
  text("ZONA INFECTADA", 38, 48);

  textSize(12);
  text("CONTAMINACIÓN", 38, 74);

  fill(60, 70, 50);
  rect(38, 88, 200, 8);

  if (infectado.alerta) {
    fill(180, 60, 45);
  } else {
    fill(130, 145, 95);
  }

  rect(38, 88, nivelContaminacion, 8);

  if (infectado.alerta) {
    fill(180, 70, 55);
    text("PELIGRO DETECTADO", 38, 118);
  } else if (modoEscucha) {
    fill(220, 215, 190);
    text("ESCUCHA ACTIVA", 38, 118);
  } else {
    fill(170, 155, 100);
    text("AMBIENTE ESTABLE", 38, 118);
  }

  fill(170, 155, 100, 175);
  text("E  ESCUCHAR", 40, height - 80);
  text("L  LINTERNA [" + (luzEncendida ? "ON" : "OFF") + "]", 40, height - 50);
}

function keyPressed() {
  if (key === "e" || key === "E") {
    modoEscucha = !modoEscucha;
  }

  if (key === "l" || key === "L") {
    luzEncendida = !luzEncendida;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  infectado.x = width * 0.72;
  infectado.y = height * 0.45;
}