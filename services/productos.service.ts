import { productosApi } from '../api/productosApi';
import { toProducto } from '../mappers/producto.mapper';
import type { Producto, ProductoDto } from '../types/producto';

export async function getProductos(): Promise<Producto[]> {
  const response = await productosApi.get<ProductoDto[]>('/products');
  return response.data.map(toProducto);
}
