Github Page : https://maximo-rossini-dev.github.io/PPT_offline/

COMPONENTES

PlayComponent - Este componente se encarga del renderizado de las 3 posibles jugadas (piedra,papel o tijeras).
El renderizado del componente esta dado sobre el constructor debido a la necesidad de re-renderizar el componente cada vez que el contador de elección de jugada se actualizara sin tener problemas con el shadowRoot.
Consiste de 6 métodos, 3 para el manejo del timer y 3 para el manejo de las animaciones mediante javascript.
Decidí no dividir sus reponsabilidades porque no necesito que sea un componente escalable o que parte de su lógica sea utilizada por otro componente.

set counter(value){} : Este setter se encarga de recibir un valor y guardarlo en una propiedad privada de el componente. Finalmente llama a updateCounter().

<!--
  Uso: Las propiedades privadas se utilizan para:

  Encapsulamiento: Mantener la lógica interna de la clase oculta y proteger los datos de modificaciones externas no deseadas.
  Control de acceso: Permitir que solo los métodos de la clase puedan modificar o acceder a esas propiedades, asegurando que se mantenga la integridad de los datos.
 -->

<!--
  Funcionalidad de los setters en clases de Javascript.
  Controlar el acceso: Permiten validar o transformar el valor antes de asignarlo a la propiedad.
  Encapsulamiento: Ayudan a mantener la lógica interna de la clase oculta, permitiendo que el usuario de la clase interactúe con ella de manera controlada.
  Notificaciones: Podés ejecutar código adicional cada vez que se establece un nuevo valor, como actualizar el DOM, disparar eventos, etc.

  El uso de un setter interno me permitio actualizar mi componente cada vez que cierta propiedad interna cambiaba su valor.

 -->

updateCounter(){} : Este método se encarga de actualizar el contenido dentro del elemento html que estamos utilizando para mostrar un contador. Es decir, actualiza el 3,2,1.

startCountdown(){} : Este método inicializa el intervalo del contador y en cada iteración del intervalo utiliza el setter counter para actualizar el valor de la propiedad timer.

AddHoverEffect(img){} : Este método recibe un elemento HTML, en este caso un tag img y le agrega el evento para escuchar cuando el mouse pasa por encima del elemento y generar una animación en base al evento.

shrinkOtherImages(activeImg){} : Este método recibe como parámetro la imagen a la cual se le esta haciendo foco y en base a ella itera las demas imagenes que obtiene del shadowRoot. Toda imagen que no sea la activeImg sera modificada para que su tamaño sea reducido.

resetOtherImages(activeImg){} : Este método se encarga de devolver las demas imagenes respecto a la activeImg al tamaño original cuando el usuario deja de hacer foco sobre una de las imagenes.

PROXIMO PASO :
SOLUCIONAR RUTA DEL FONDO EN GHP
