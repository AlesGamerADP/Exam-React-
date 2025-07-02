import { useState } from 'react';
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default function Home() {
  const [producto, setProducto] = useState(null);

  return (
    <>
    <Header />
    <div className="container py-4">
      <ProductForm 
        productoEnEdicion={producto} 
        limpiarSeleccion={() => setProducto(null)} />
      <ProductList onSelect={setProducto} />
    </div>
    </>
  );
}
