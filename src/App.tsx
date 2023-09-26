import { useEffect, useState } from 'react'
import './App.css'
import { Producto } from './classes/Producto'
import { Inventario } from './classes/Inventario'

// Instancia de la clase inventario
const miInventario = new Inventario()

const producto1: Producto = {
  nombre: 'Laptop',
  precio: 10000,
  cantidadStock: 10
}
const producto2: Producto = {
  nombre: 'Mouse',
  precio: 550,
  cantidadStock: 20
}
const producto3: Producto = {
  nombre: 'Teclado',
  precio: 600,
  cantidadStock: 15
}
const producto4: Producto = {
  nombre: 'Pendrive',
  precio: 250,
  cantidadStock: 25
}
miInventario.agregarProducto(producto1)
miInventario.agregarProducto(producto2)
miInventario.agregarProducto(producto3)
miInventario.agregarProducto(producto4)

function App() {
  // Estado local para gestionar la informacion de productos
  const [inventario, setInventario] = useState<Producto[]>([]);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [cantidadStock, setCantidadProducto] = useState('');
  const [mensajeVenta, setMensajeVenta] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');

  // Funcion para agregar un producto
  const agregarProducto = () => {
    const nuevoProducto: Producto = {
      nombre: nombreProducto,
      precio: parseFloat(precioProducto),
      cantidadStock: parseInt(cantidadStock)
    }

    miInventario.agregarProducto(nuevoProducto);
    console.log(miInventario.verProductos());
    // setInventario([...inventario, nuevoProducto]);
    setInventario(miInventario.verProductos())
    //Limpieza de campos del formulario
    setNombreProducto('')
    setPrecioProducto('')
    setCantidadProducto('')

  }

  // Funcion para realizar una venta
  const realizarVenta = () => {
    const mensaje = miInventario.realizarVenta(producto, parseInt(cantidad))
    if (mensaje !== 'Producto no disponible en la cantidad requerida.') {
      if (parseInt(cantidad)>=3 && parseInt(cantidad)<10) {
        setMensajeVenta(mensaje+', Se aplica 10% de descuento');
      } else if (parseInt(cantidad)>=10) {
        setMensajeVenta(mensaje+', Se aplica 20% de descuento');
      } else {
        setMensajeVenta(mensaje+', Venta minorista')
      }
    } else {
      setMensajeVenta(mensaje)
    }
    setProducto('')
    setCantidad('')
  }

  useEffect(()=>{
    setInventario(miInventario.verProductos())
  },[])

  return (
    <>
      <div>
        <h1>Sistema de gestion de inventarios</h1>
        <hr />
        <br />
        <h2>Agregar Productos</h2>
        <form>
          <input 
            type="text"
            name="nombreProducto"
            placeholder='Nombre del Producto'
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
          <input 
            type="number"
            name="precioProducto"
            placeholder='Precio del Producto'
            value={precioProducto}
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
          <input 
            type="number"
            name="cantidadStock"
            placeholder='Cantidad en Stock'
            value={cantidadStock}
            onChange={(e) => setCantidadProducto(e.target.value)}
          />
          <button
            type='button'
            onClick={agregarProducto}
          >
            Agregar
          </button>
        </form>
        <br />
        <hr />
        <br />
        <div>
          <h2>Productos en inventario: </h2>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
            {inventario.map((prod, i) => (
              <tr key={i}>
                <td>{prod.nombre}</td>
                <td>$ {prod.precio}</td>
                <td>{prod.cantidadStock} u.</td>
              </tr>
            ))}
          </table>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <h2>Realizar Venta</h2>
          <div>
            <select onChange={(e) => setProducto(e.target.value)}>
              {
                inventario.map((producto, i) => (
                  <option key={i} value={producto.nombre}>{producto.nombre}</option>
                ))
              }
            </select>
            
          </div>
          <input 
            type="number"
            name="cantidad"
            placeholder='Cantidad'
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <button
            type='button'
            onClick={realizarVenta}
          >
            Vender
          </button>
          <div>{mensajeVenta}</div>
        </div>
      </div>
    </>
  )
}

export default App
