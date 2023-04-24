import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const PreviewProducto = ({ producto }) => {
  const { nombre, _id, proveedor } = producto;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase">
            {""} {proveedor}
          </span>
        </p>
      </div>
      <Link
        to={`editar/${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Producto
      </Link>
    </div>
  );
};

PreviewProducto.propTypes = {
  producto: PropTypes.object,
};

export default PreviewProducto;
