// Estructura de datos para almacenar los zapatos por categoría
let zapatosPorCategoria = {
  inicio: [],
  Deportivo: [],
  Sandalias: [],
  Formales: []
};

// Contador para asignar un id único a cada zapato
let idCounter = 1;

// Función para mostrar los zapatos en la sección correspondiente
function mostrarZapatos() {
  for (const categoria in zapatosPorCategoria) {
    const categoriaContent = document.getElementById(`${categoria}Content`);
    categoriaContent.innerHTML = '';

    // En la sección "inicio", solo mostrar la información del zapato sin botones de editar y eliminar
    if (categoria === 'inicio') {
      zapatosPorCategoria[categoria].forEach((zapato) => {
        const zapatoElement = document.createElement('div');
        zapatoElement.textContent = `ID: ${zapato.id}, Nombre: ${zapato.nombre}, Color: ${zapato.color}, Talla: ${zapato.talla}, Precio: $${zapato.precio}`;
        categoriaContent.appendChild(zapatoElement);
      });
    } else {
      // En otras secciones, mostrar la información del zapato con botones de editar y eliminar
      zapatosPorCategoria[categoria].forEach((zapato, index) => {
        const zapatoElement = document.createElement('div');
        zapatoElement.textContent = `ID: ${zapato.id}, Nombre: ${zapato.nombre}, Color: ${zapato.color}, Talla: ${zapato.talla}, Precio: $${zapato.precio}`;

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
          editarZapato(categoria, index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
          eliminarZapato(categoria, index);
        });

        zapatoElement.appendChild(editButton);
        zapatoElement.appendChild(deleteButton);

        categoriaContent.appendChild(zapatoElement);
      });
    }
  }
}

// Función para editar un zapato en una categoría
function editarZapato(categoria, index) {
  const nombre = prompt('Ingrese el nuevo nombre del zapato:');
  const color = prompt('Ingrese el nuevo color del zapato:');
  const talla = prompt('Ingrese la nueva talla del zapato:');
  const precio = prompt('Ingrese el nuevo precio del zapato:');
  if (nombre && color && talla && precio) {
    const zapato = zapatosPorCategoria[categoria][index];
    zapato.nombre = nombre;
    zapato.color = color;
    zapato.talla = talla;
    zapato.precio = parseFloat(precio);
    actualizarZapatoInicio(zapato);
    guardarEnLocalStorage();
    mostrarZapatos();
  } else {
    alert('Debe ingresar nombre, color, talla y precio del zapato.');
  }
}

// Función para actualizar el zapato en la sección "inicio"
function actualizarZapatoInicio(zapato) {
  const id = zapato.id;
  const indexInicio = zapatosPorCategoria.inicio.findIndex((z) => z.id === id);
  if (indexInicio !== -1) {
    zapatosPorCategoria.inicio[indexInicio] = { ...zapato };
  } else {
    zapatosPorCategoria.inicio.push({ ...zapato }); // Agrega una copia del objeto zapato
  }
}

// Función para eliminar un zapato de una categoría y de Inicio
function eliminarZapato(categoria, index) {
  const zapato = zapatosPorCategoria[categoria].splice(index, 1)[0];
  eliminarZapatoInicio(zapato);
  guardarEnLocalStorage();
  mostrarZapatos();
}

// Función para eliminar el zapato de la sección "inicio"
function eliminarZapatoInicio(zapato) {
  const id = zapato.id;
  const indexInicio = zapatosPorCategoria.inicio.findIndex((z) => z.id === id);
  if (indexInicio !== -1) {
    zapatosPorCategoria.inicio.splice(indexInicio, 1);
  }
}

// Función para agregar un zapato a una categoría
function agregarZapato(nombre, color, talla, precio, categoria) {
  const zapato = { id: idCounter++, nombre, color, talla, precio: parseFloat(precio) };
  zapatosPorCategoria[categoria].push(zapato);
  actualizarZapatoInicio(zapato); // Agregar también en la sección "inicio"
  guardarEnLocalStorage();
  mostrarZapatos();
}

// Event Listener para el botón "Agregar Zapato"
document.getElementById('agregarZapato').addEventListener('click', () => {
  const nombre = prompt('Ingrese el nombre del zapato:');
  const color = prompt('Ingrese el color del zapato:');
  const talla = prompt('Ingrese la talla del zapato:');
  const precio = prompt('Ingrese el precio del zapato:');
  const categoria = prompt('Ingrese la categoría del zapato (Deportivo, Sandalias o Formales):');

  if (nombre && color && talla && precio) {
    if (zapatosPorCategoria[categoria]) {
      agregarZapato(nombre, color, talla, precio, categoria);
    } else {
      alert('Categoría inválida. El zapato no se agregará.');
    }
  } else {
    alert('Debe ingresar nombre, color, talla y precio del zapato.');
  }
});

// Función para ocultar todas las secciones excepto la seleccionada
function mostrarSeccion(seccionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id === seccionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// Función para guardar los datos en el localStorage
function guardarEnLocalStorage() {
  const dataToStore = JSON.stringify(zapatosPorCategoria);
  localStorage.setItem('zapatosPorCategoria', dataToStore);
}

// Mostrar la sección "Inicio" al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarSeccion('inicio');

  // Recuperar los datos del localStorage (si existen)
  const storedData = localStorage.getItem('zapatosPorCategoria');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      zapatosPorCategoria = parsedData;
      mostrarZapatos();
    }
  }
});