import React from "react";
import useProductos from "../hooks/useProductos";
import PreviewProducto from "../components/PreviewProducto";
import Alerta from "../components/Alerta";

const Productos = () => {
  const { productos, alerta } = useProductos();
  const { msg } = alerta;

  return (
    <>
      <h2 className="text-4xl font-black">Listado de Productos</h2>
      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg ">
        {productos.length ? (
          productos.map((producto) => (
            <PreviewProducto key={producto._id} producto={producto} />
          ))
        ) : (
          <p className=" text-center text-gray-600 uppercase  p-5">
            No hay productos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Productos;
