import { useEffect } from 'react';
import { useProductos } from '../store/useProductos';
import ProductCard from './ProductCard';

export default function ProductList({ onSelect }) {
  const { productos, getProductos, eliminarProducto } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="row">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onEdit={() => onSelect(producto)}
          onDelete={() => eliminarProducto(producto.id)}
        />
      ))}
    </div>
  );
  
}
