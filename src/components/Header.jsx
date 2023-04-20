import { Link } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const { cerrarSesionProductos } = useProductos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProductos()
        localStorage.removeItem('token')
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                    El Tiempo
                </h2>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <Link
                        to="/productos"
                        className='font-bold uppercase'
                    >Productos</Link>
                    <button
                        type="button"
                        className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>
                </div>
            </div>
        </header>
    )
}

export default Header