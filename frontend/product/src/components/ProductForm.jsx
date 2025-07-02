// Importación de hooks de React
import { useState, useEffect } from 'react';
// Importación del store de Zustand
import { useProductos } from '../store/useProductos';

// Componente de formulario para crear o editar productos
export default function ProductForm({ productoEnEdicion, limpiarSeleccion }) {
  // Extraemos las funciones del store para crear y editar productos
  const { crearProducto, editarProducto } = useProductos();

  // Estado local para manejar los datos que el usuario escribe
  const [datosProducto, setDatosProducto] = useState({ nombre: '', descripcion: '' });

  // Cada vez que cambia el producto en edición, actualiza el formulario
  useEffect(() => {
    // Si hay un producto en edición, carga sus datos
    // Si no hay, limpia los campos
    setDatosProducto(productoEnEdicion || { nombre: '', descripcion: '' });
  }, [productoEnEdicion]);

  // Esta función se ejecuta cuando se envía el formulario
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Evita que se recargue la página

    if (productoEnEdicion) {
      // Si hay producto en edición → actualiza
      editarProducto(productoEnEdicion.id, datosProducto);
    } else {
      // Si no hay producto en edición → crea uno nuevo
      crearProducto(datosProducto);
    }

    // Después de crear o editar:
    limpiarSeleccion(); // Sale del modo edición
    setDatosProducto({ nombre: '', descripcion: '' }); // Limpia los campos
  };

  // Esta función se ejecuta cada vez que el usuario escribe algo
  const manejarCambio = (evento) => {
    setDatosProducto({
      ...datosProducto,
      [evento.target.name]: evento.target.value
    });
  };

  // Renderizado del formulario
  return (
    <form onSubmit={manejarEnvio}>
      {/* Crea un input para cada campo: nombre y descripción */}
      {['nombre', 'descripcion'].map((campo) => (
        <input
          key={campo}
          name={campo}
          className="form-control mb-2"
          placeholder={campo}
          value={datosProducto[campo]}
          onChange={manejarCambio}
          required
        />
      ))}

      {/* Botón principal: cambia el texto según si se está editando o no */}
      <button className="btn btn-primary">
        {productoEnEdicion ? 'Actualizar' : 'Agregar'}
      </button>

      {/* Muestra un botón "Cancelar" solo si estás editando */}
      {productoEnEdicion && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={limpiarSeleccion}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
