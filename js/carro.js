    /* Carrito */

    function carritoCompras() {

        // Boton "Agregar al carrito" y Productos
        const anadirCarrito = document.querySelectorAll('.anadirAlCarrito'); // Botón "Agregar al carrito"


        anadirCarrito.forEach((botonAnadirCarrito) => {
            botonAnadirCarrito.addEventListener('click', clikBtnCarrito)
        });

        function clikBtnCarrito(event) {
            let btn = event.target;
            const articulos = btn.closest('.articulo');

            // Productos
            const articulotImg = articulos.querySelector('.articulo-img').src;
            const articuloTitulo = articulos.querySelector('.articulo-title').textContent;
            const precioArticulo = articulos.querySelector('.articulo-Precio').textContent;


            modalCarrito(articulotImg, articuloTitulo, precioArticulo);

            contadorCarritoAct();

        };
        // Modal cart
        const verCarrito = document.querySelector('.mostrarCarrito');

        function modalCarrito(articuloImg, articuloTitulo, precioArticulo) {

            // Que no se duplique el mismo producto en el Carrito
            let articulosRepetidos = verCarrito.getElementsByClassName('carritoComprasArticuloTitulo');

            for (let i = 0; i < articulosRepetidos.length; i++) {
                if (articulosRepetidos[i].innerHTML === articuloTitulo) {
                    let tituloArticuloRepetido = articulosRepetidos[i].parentElement.parentElement.querySelector('.carritoComprasCantidadArticulo');
                    tituloArticuloRepetido.value++;
                    precioTotalCarrito();

                    return;
                }
            };

            const carritoComprasDiv = document.createElement('div');
            const carritoModal =
                ` 
                      <div class="row carritoComprasArticulo mt-3 text-center">
                          <div class="col-3">
                              <img src=${articuloImg} class="w-100"/>
                              <h6 class="mt-2 carritoComprasArticuloTitulo">${articuloTitulo}</h6>
                          </div> 
                          <div class="col-3">
                              <p class="articulo-Precio carritoComprasPrecioArticulo">${precioArticulo}</p>
                          </div>
                          <div class="col-3">
                              <input class="text-center carritoComprasCantidadArticulo inputCuenta" type="number" value="1">
                          </div>
                          <div class="col-3">
                              <button class="btn btn-danger" id="borrarArticulo" data-name="${articuloTitulo}">
                                  x
                              </button>
                          </div>
                      </div>
                  `

            carritoComprasDiv.innerHTML = carritoModal;
            verCarrito.append(carritoComprasDiv);

            // Botón Remover articulo
            const botonRemover = carritoComprasDiv.querySelector('#borrarArticulo');

            botonRemover.addEventListener('click', BorrarArticuloCarrito);

            // Input Quantity
            const ingresarCantidad = carritoComprasDiv.querySelector('.carritoComprasCantidadArticulo');

            ingresarCantidad.addEventListener('change', cambiarCantidadCarrito);


            precioTotalCarrito();
        };

        // contador del carrito
        function contadorCarritoAct() {
            const carritoArticuloLength = document.querySelectorAll('.carritoComprasArticulo');
            const cartCounter = document.querySelector('#cart-counter');
            cartCounter.innerHTML = carritoArticuloLength.length;
            precioTotalCarrito();
        };


        // Precio total del carrito
        function precioTotalCarrito() {
            let totalContador = 0;
            const totalPrecio = document.querySelector('.total-Precio');
            const carritoComprasArticulos = document.querySelectorAll('.carritoComprasArticulo');

            carritoComprasArticulos.forEach((carritoComprasArticulo) => {

                const articuloCarPrecioElement = carritoComprasArticulo.querySelector('.carritoComprasPrecioArticulo');
                const articuloCarPrecio = Number(articuloCarPrecioElement.textContent.replace('$', ''));

                const articuloCarCantidadElemento = carritoComprasArticulo.querySelector('.carritoComprasCantidadArticulo');
                const articuloCarCantidad = Number(articuloCarCantidadElemento.value);

                totalContador += articuloCarPrecio * articuloCarCantidad;
            });

            totalPrecio.innerHTML = `$${totalContador.toFixed(2)}`;
        };

        // Eliminar articuloas del carrito
        function BorrarArticuloCarrito(event) {
            const removeBtnClicked = event.target;
            removeBtnClicked.closest('.carritoComprasArticulo').remove();
            precioTotalCarrito();
            contadorCarritoAct();
        };

        // Cantidad del carrito (Input)
        function cambiarCantidadCarrito(event) {
            const cambiarCantidadCarrito = event.target;
            cambiarCantidadCarrito.value <= 0 ? (cambiarCantidadCarrito.value = 1) : null;
            precioTotalCarrito();
            contadorCarritoAct();
        };

        // Finalizar compra
        const botonFinalizarCompra = document.querySelector('.btnfinalizar');

        botonFinalizarCompra.addEventListener('click', finalizarCompraTotal);

        function finalizarCompraTotal() {
            verCarrito.innerHTML = '';
            precioTotalCarrito();
            contadorCarritoAct();
        };

        // Vaciar todo el carrito
        const botonVaciarCarrito = document.querySelector('.btnvaciarcarrito');

        botonVaciarCarrito.addEventListener('click', vaciarCarritoCompleto);

        function vaciarCarritoCompleto() {
            verCarrito.innerHTML = '';
            precioTotalCarrito();
            contadorCarritoAct();
        };
    };

    carritoCompras();