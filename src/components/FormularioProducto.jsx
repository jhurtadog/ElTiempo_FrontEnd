import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import Alerta from './Alerta'

const FormularioProducto = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')
    const [proveedor, setProveedor] = useState('')
    const params = useParams();
    const { mostrarAlerta, alerta, submitProducto, producto } = useProductos();

    useEffect(() => {
        if (params.id) {
            setId(producto._id)
            setNombre(producto.nombre)
            setDescripcion(producto.descripcion)
            setFecha(producto.fecha?.split('T')[0])
            setProveedor(producto.proveedor)
        }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fecha, proveedor].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })

            return
        }

        await submitProducto({ id, nombre, descripcion, fecha, proveedor })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFecha('')
        setProveedor('')
    }

    const { msg } = alerta

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Nombre Producto</label>
                <input
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Producto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >Descripción</label>
                <textarea
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Producto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha"
                >Fecha</label>
                <input
                    id="fecha"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="proveedor"
                >Nombre Proveedor</label>
                <input
                    id="proveedor"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proveedor"
                    value={proveedor}
                    onChange={e => setProveedor(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value={id ? 'Actualizar Producto' : 'Crear Producto'}
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
            />
        </form>
    )
}

export default FormularioProducto
