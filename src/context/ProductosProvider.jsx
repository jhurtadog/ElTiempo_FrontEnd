import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [producto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/productos', config)
                setProductos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProductos()
    }, [auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProducto = async producto => {
        if (producto.id) {
            await editarProducto(producto)
        } else {
            await nuevoProducto(producto)
        }
    }

    const editarProducto = async producto => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/productos/${producto.id}`, producto, config)
            const proyectosActualizados = productos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProductos(proyectosActualizados)

            setAlerta({
                msg: 'Producto actualizado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProducto = async producto => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/productos', producto, config)
            setProductos([...productos, data])
            setAlerta({
                msg: 'Producto creado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProducto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/productos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/productos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProducto = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/productos/${id}`, config)
            const proyectosActualizados = productos.filter(proyectoState => proyectoState._id !== id)
            setProductos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/productos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }


    const cerrarSesionProductos = () => {
        setProductos([])
        setProyecto({})
        setAlerta({})
    }

    return (
        <ProductosContext.Provider
            value={{
                productos,
                mostrarAlerta,
                alerta,
                submitProducto,
                obtenerProducto,
                producto,
                cargando,
                eliminarProducto,
                cerrarSesionProductos
            }}
        >{children}
        </ProductosContext.Provider>
    )
}
export {
    ProductosProvider
}

export default ProductosContext