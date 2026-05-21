# Solemne-II
Sistema interactivo óptico


### Explorando en Zona de Cuarentena

Autor: Sam Alexander Marquez Mejías

Curso: Pensamiento Computacional Sec 3 

## Descripción objetiva

"Explorando en Zona de Cuarentena" es una experiencia visual interactiva desarrollada en p5.js inspirada en la atmósfera y mecánicas de The Last of Us. El proyecto busca recrear la sensación de exploración, tensión e incertidumbre presente en el videojuego mediante iluminación dinámica, partículas ambientales y detección de amenazas dentro de un espacio abandonado.

En pantalla se observa un hospital abandonado y oscuro donde el usuario explora utilizando una linterna controlada por el mouse. Dentro del ambiente aparecen partículas flotantes que simulan esporas y un infectado que se revela progresivamente al ser iluminado o detectado mediante el modo escucha.

## Elementos visuales presentes:

- Fondo de hospital abandonado.
- Sistema de iluminación tipo linterna.
- Esporas/partículas ambientales.
- Infectado interactivo.
- HUD informativo.
- Alerta visual de peligro.
- Modo escucha inspirado en The Last of Us.
  
## Inputs utilizados

- Movimiento del mouse para controlar la linterna.
- Tecla L para encender o apagar la luz.
- Tecla E para activar el modo escucha.
 
## Outputs generados

- Linterna dinámica.
- Oscuridad ambiental.
- Partículas flotantes.
- HUD interactivo.
- Alerta visual roja.
- Modo escucha.
- Revelación parcial del infectado.
 
# Idea y proceso del proyecto

No sabía por dónde empezar el proyecto, por lo que, como me suele pasar cuando tengo bloqueos creativos, comencé buscando referencias en cosas que realmente me gustan e interesan. Dentro de los marcos conceptuales propuestos para la solemne, los que más me llamaron la atención fueron el diseño de interfaces y el diseño de videojuegos, ya que los videojuegos son una de las cosas que más disfruto, especialmente The Last of Us, que es mi videojuego favorito.

A partir de eso decidí basar el proyecto en elementos visuales e interactivos inspirados en el juego, pensando cómo ciertas mecánicas podían trasladarse a un entorno realizado en p5.js. Como el proyecto debía ser interactivo, comencé identificando elementos característicos del juego que pudieran adaptarse visualmente, como el uso de la linterna y el “modo escucha”, mecánica que permite detectar la presencia de infectados incluso dentro de la oscuridad.

Para construir el sistema fue necesario trabajar mediante variables que controlan distintos estados y elementos del entorno, como la posición de la luz, la activación del modo escucha, el estado de la linterna, la posición del infectado, la cantidad de contaminación y las partículas ambientales. Estas variables permiten que el sistema responda constantemente a la interacción del usuario y modifique el ambiente en tiempo real.

También se utilizaron condicionales para determinar cuándo el infectado debía entrar en estado de alerta, cuándo el HUD debía cambiar de color, cuándo activar visualmente el peligro y cuándo el ambiente debía modificarse dependiendo de si la linterna o el modo escucha estaban activos. Gracias a estas condiciones, el sistema puede reaccionar de manera distinta según las decisiones del usuario.

Con esas ideas ya tenía una dirección más clara, pero quería que el sistema transmitiera tensión y sensación de peligro. Por eso incorporé una barra de contaminación/peligro que varía dependiendo de la cercanía con el infectado: mientras más lejos se encuentra, el indicador permanece bajo y en tonos amarillos, pero al acercarse o iluminar directamente al infectado, la interfaz cambia progresivamente a tonos rojos para reforzar visualmente la sensación de amenaza. Para generar esta variación gradual se utilizó la función map(), permitiendo transformar la distancia entre la luz y el infectado en distintos niveles visuales de contaminación y alerta.

También quise trabajar la iluminación de forma similar al juego. Mi intención era que el ambiente permaneciera casi completamente oscuro y que la linterna no iluminara totalmente la escena, sino apenas lo suficiente para revelar fragmentos del espacio y del infectado, generando incertidumbre visual durante la exploración. Para esto se desarrollaron distintas funciones encargadas de dibujar la iluminación, la oscuridad ambiental, las partículas y los efectos visuales del sistema, organizando el código de manera más clara y modular.

En cuanto al ambiente, decidí utilizar como fondo un escenario inspirado en un hospital abandonado, ya que este tipo de espacios son muy característicos dentro del universo de The Last of Us. Sobre este entorno añadí partículas flotantes que simulan esporas, uno de los elementos más icónicos del juego y que ayudan a reforzar la atmósfera de contaminación. Estas partículas fueron generadas y actualizadas mediante bucles, permitiendo que se mantengan constantemente en movimiento dentro de la escena y generando una sensación más orgánica y viva.

Finalmente, escogí específicamente a los Acechadores como tipo de infectado representado en el proyecto debido a su comportamiento dentro del juego, ya que suelen ocultarse en la oscuridad y aparecer repentinamente. Consideré que eran los más adecuados para una propuesta visual basada en exploración, iluminación limitada y tensión atmosférica. Además, para evitar movimientos completamente rígidos y repetitivos, se utilizó random() en distintos elementos del sistema, especialmente en el comportamiento de las partículas y pequeñas variaciones visuales del entorno, permitiendo que el ambiente se sintiera más natural e impredecible.

# Referentes visuales e inspiración

## Ambiente y atmósfera

Esta referencia fue utilizada para construir la atmósfera general del proyecto. Me interesaba trabajar un entorno oscuro donde la iluminación fuera limitada y el espacio se percibiera parcialmente, similar a las zonas explorables de The Last of Us.

<img width="900" alt="fondo png" src="https://github.com/user-attachments/assets/6e703741-a11b-4cab-92df-e8a85cb00c32" />

## Esporas y contaminación ambiental

Las esporas fueron uno de los elementos principales que quise rescatar del juego. Estas ayudan a reforzar la sensación de contaminación y presencia biológica dentro del ambiente.

<img width="700" alt="Referencia esporas The Last of Us" src="https://github.com/user-attachments/assets/f79a7e62-0b60-4514-965b-b27587010a7a" />

## Modo escucha

El modo escucha del juego fue una de las principales referencias para el sistema interactivo. A partir de esta mecánica desarrollé una reinterpretación visual dentro de p5.js que permite detectar amenazas dentro de la oscuridad.

<img width="700" alt="Referencia modo escucha The Last of Us" src="https://github.com/user-attachments/assets/cfcbb594-f324-4b52-8940-f44a43786796" />

## Infectados y tensión visual

## Infectados y tensión visual

Para el proyecto elegí específicamente a los Acechadores debido a que suelen ocultarse dentro de espacios oscuros, apareciendo solo parcialmente iluminados. Esto se relacionaba directamente con la lógica de exploración e iluminación limitada que quería trabajar dentro del sistema.

<img width="700" alt="Referencia infectado The Last of Us" src="https://github.com/user-attachments/assets/29a66977-d754-464a-aed4-bd6a7c47c89f" />

<img width="500" alt="Infectado integrado en el proyecto" src="https://github.com/user-attachments/assets/3e7bed9f-e7b8-47ed-a340-46084d8d422f" />

## Resultado final del proyecto

Captura del infectado utilizado dentro de la experiencia interactiva. La entidad responde a la iluminación, al modo escucha y a la cercanía del usuario, activando distintos estados visuales de alerta dentro del entorno.

<img width="850" alt="Captura final del proyecto en funcionamiento" src="https://github.com/user-attachments/assets/7ef03f8a-5bdb-4357-9a54-208dc98df917" />



