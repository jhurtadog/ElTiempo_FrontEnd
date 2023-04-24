import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import Productos from "./paginas/Productos";
import NuevoProducto from "./paginas/NuevoProducto";
import EditarProducto from "./paginas/EditarProducto";
import { AuthProvider } from "./context/AuthProvider";
import { ProductosProvider } from "./context/ProductosProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
            </Route>

            <Route path="/productos" element={<RutaProtegida />}>
              <Route index element={<Productos />} />
              <Route path="crear-producto" element={<NuevoProducto />} />
              <Route path="editar/:id" element={<EditarProducto />} />
            </Route>
          </Routes>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
