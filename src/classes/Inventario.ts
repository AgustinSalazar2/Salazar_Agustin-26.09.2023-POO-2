import { Producto } from './Producto'

export class Inventario {
  private productos: Producto[] = []

  public verProductos () : Producto[] {
    return this.productos
  }

  public agregarProducto (producto: Producto) {
    this.productos.push(producto)
  }

  public actualizarStock (nombreProducto: string, cantidad: number): void {
    const producto = this.productos.find((p) => p.nombre === nombreProducto)
    if (producto) {
      producto.cantidadStock += cantidad
    }
  }

  public realizarVenta (nombreProducto: string, cantidad: number) : string {
    const producto = this.productos.find((p) => p.nombre === nombreProducto)
    if (producto && producto.cantidadStock >= cantidad) {
      const precioTotal = this.calcularPrecioTotal(producto, cantidad)
      producto.cantidadStock -= cantidad
      return `Venta exitosa! Producto vendido: "${producto.nombre}" - Precio total: $${precioTotal}`
    } else {
      return 'Producto no disponible en la cantidad requerida.'
    }
  }

  public calcularPrecioTotal (producto: Producto, cantidad: number) : number | null{
    if (cantidad < 3) {
      return producto.precio * cantidad
    } else if (cantidad >= 3 && cantidad < 10) {
      // Se implementa un 10% de descuento por venta en cantidad(a partir de 3 unidades, hasta 10 unidaddes)
      const total = producto.precio * cantidad * 0.9
      return total
    } else if (cantidad >= 10) {
      // Se implementa  un 20% de descuento en ventas por bolsa(a partir de 10 unidades)
      const total = producto.precio * cantidad * 0.80
      return total
    } else {
      return null
    }
  }
}
