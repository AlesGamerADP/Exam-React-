function ProductCard({ producto, onEdit, onDelete }) {
    return (
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5>{producto.nombre}</h5>
            <p>{producto.descripcion}</p>
            <button className="btn btn-warning btn-sm me-2" onClick={onEdit}>
              Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  