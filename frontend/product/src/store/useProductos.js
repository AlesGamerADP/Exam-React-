import { create } from 'zustand';
import api from '../services/api';

export const useProductos = create((set) => ({
  productos: [],

  getProductos: async () => {
    const respuesta = await api.get('/productos/');
    set({ productos: respuesta.data });
  },

  crearProducto: async (datos) => {
    const respuesta = await api.post('/productos/', datos);
    set((estadoAnterior) => ({
      productos: [...estadoAnterior.productos, respuesta.data],
    }));
  },

  editarProducto: async (id, datos) => {
    const respuesta = await api.put('/productos/' + id + '/', datos);
    set((estadoAnterior) => ({
      productos: estadoAnterior.productos.map((producto) =>
        producto.id === id ? respuesta.data : producto
      ),
    }));
  },

  eliminarProducto: async (id) => {
    await api.delete('/productos/' + id + '/');
    set((estadoAnterior) => ({
      productos: estadoAnterior.productos.filter(
        (producto) => producto.id !== id
      ),
    }));
  },
}));
