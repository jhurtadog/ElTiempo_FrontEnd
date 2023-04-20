import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioProducto from '../components/FormularioProducto'
import { useNavigate } from 'react-router-dom'
import useProductos from "../hooks/useProductos"

const EditarProducto = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { obtenerProducto, producto, cargando, eliminarProducto } = useProductos()

  useEffect(() => {
    obtenerProducto(params.id)
  }, [])

  const handleClick = () => {
    if (confirm('¿Deseas eliminar este producto?')) {
      eliminarProducto(params.id)
    }
  }

  const handleClickBack = () => {
    navigate('/productos')
  }

  const { nombre } = producto
  if (cargando) return 'Cargando...'

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='font-black text-4xl'>Editar Producto: {nombre}</h2>
        <div className='flex justify-between gap-10 text-gray-400'>
          <div className='flex justify-between gap-1 items-center hover:text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>

            <button
              className='uppercase font-bold'
              onClick={handleClickBack}
            >Cancelar</button>
          </div>
          <div className=' flex justify-between gap-1 items-center hover:text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <button
              className='uppercase font-bold'
              onClick={handleClick}
            >Eliminar</button>
          </div>
        </div>

      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProducto />
      </div>
    </>
  )
}

export default EditarProducto
