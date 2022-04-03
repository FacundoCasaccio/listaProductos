/*1. Escriba una funcion que permita administrar el inventario de una tienda virtual 
        Su sistema debe permitir lo siguiente: 
            1. Escoger una opcion entre: 
                A. Crear un producto
                B. Listar todos los productos de la tienda
                C. Borrar un producto, dado su id
                D. Modificar un producto, dado su id
                E. FIN
            Los productos deben tener la siguiente estructura: 
            id
            nombre
            precio
            Si el usuario ingresa FIN, debe terminar el proceso
            SI el usuario ingresa una opción inválida debe mostrar un mensaje indicando el error y mostrar el menú de nuevo
    */

//La funcion que envuelve el codigo permite cargar el HTML y CSS antes que corra el script
//Para que el usuario pueda ver el contenido de la pagina mientras utiliza el programa a 
//Codigo buscado en internet solamente para este proposito :)

document.addEventListener("DOMContentLoaded", function (event) {
    //Funciones y clases
    function mainMenu() {
        let opcion = prompt(`Elija una opcion:
                        A. Crear un producto
                        B. Listar productos
                        C. Borrar producto
                        D. Modificar producto
                        E. FIN`);

        return opcion.toLowerCase();
    }

    class Producto {
        constructor(id, nombre, precio) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    function crearProducto() {
        let id = parseInt(prompt("Ingrese id del producto: "));
        let nombre = prompt("Ingrese el nombre del producto");
        let precio = parseFloat(prompt("Ingrese el precio del producto"));

        return new Producto(id, nombre, precio);
    }

    class Lista {
        constructor(productos) {
            this.productos = productos;
        }

        //Mostrar lista al usuario
        listar() {
            let listado = `Listado de productos: \n\n`;

            for (let producto of this.productos) {
                listado += producto.id + " - " + producto.nombre + " $" + producto.precio + "\n";
            }

            alert(listado);
        }

        //Agregar producto a la lista
        agregar() {
            let producto = crearProducto();
            this.productos.push(producto);
        }

        //Borrar un producto de la lista por id
        borrar(id) {
            let indice = -1;

            for (let producto of this.productos) {
                if (producto.id == id) {
                    indice = this.productos.indexOf(producto);
                    break;
                }
            }

            if (indice == -1) {
                alert("El producto no pertenece a la lista");
            } else {
                this.productos = this.productos.slice(0, indice).concat(this.productos.slice((indice + 1)));
            }
        }

        modificar(id) {
            let indice = -1;
            let opcion;

            for (let producto of this.productos) {
                if (producto.id == id) {
                    indice = this.productos.indexOf(producto);
                    break;
                }
            }

            if (indice == -1) {
                alert("El producto no pertenece a la lista");
                return;
            }

            opcion = parseInt(prompt("Elija que propiedad desea modificar: \n1- Nombre\n2- Precio"));

            do {
                if (opcion == 1) {
                    this.productos[indice].nombre = prompt("Ingrese el nuevo nombre: ");
                    alert("Nombre modificado correctamente");
                    return;
                } else if (opcion == 2) {
                    this.productos[indice].precio = parseFloat(prompt("Ingrese el nuevo valor del precio: "));
                    alert("Precio modificado correctamente");
                    return

                }
            } while (opcion = parseInt(prompt("Opcion incorrecta, ingrese nuevamente...\nElija que propiedad desea modificar: \n1- Nombre\n2- Precio")));
        }
    }


    //Test del programa
    alert(`Bienvenido a lista de productos!`);

    let lista = new Lista([]); //Inicializacion de lista vacia
    let opcion = mainMenu();

    while (opcion != "e") {

        switch (opcion) {
            case "a":
                lista.agregar();
                alert("Producto agregado con exito");
                console.log(lista.listar());
                break;

            case "b":
                lista.listar();
                break;

            case "c":
                lista.borrar(parseInt(prompt("Ingrese el id del producto a borrar: ")));
                lista.listar();
                break;

            case "d":
                lista.modificar(parseInt(prompt("Ingrese el id del producto a modificar: ")));
                console.log(lista.listar());
                break;

            case "e":
                break;

            default:
                opcion = alert("Opcion incorrecta, ingrese nuevamente");
                break;
        }

        if (opcion != "e") {
            opcion = mainMenu().toLowerCase();
        }
    }
});


