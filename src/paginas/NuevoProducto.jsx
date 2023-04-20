import FormularioProducto from "../components/FormularioProducto"
import { useNavigate } from 'react-router-dom'

const NuevoProducto = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/productos')
  }
  return (
    <>
      <div className='flex justify-between'>
        <h2 className="text-4xl font-black">Crear Producto</h2>
        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <button
            className='uppercase font-bold'
            onClick={handleClick}
          >Volver</button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProducto />
      </div>
    </>
  )
}

export default NuevoProducto