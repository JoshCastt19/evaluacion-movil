import type { Producto, ProductoDto } from '../types/producto';

export function toProducto(dto: ProductoDto): Producto {
  return {
    id: dto.id,
    nombre: dto.title.trim(),
    precio: dto.price,
    descripcion: dto.description,
    categoria: dto.category,
    imagen: { uri: dto.image.trim() },
  };
}
