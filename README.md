# Productos

Aplicación con React Native, Expo, TypeScript y Axios. Consulta Fake Store API y muestra una lista de productos con su detalle.

## Ejecutar en web

```powershell
npm.cmd run web
```

## Ejecutar con Expo

```powershell
npm.cmd start
```

## Archivos

- App.tsx: lista, detalle, carga y error.
- types/producto.ts: respuesta de la API y modelo de la aplicación.
- mappers/producto.mapper.ts: transformación de los productos.
- api/productosApi.ts: configuración de Axios.
- services/productos.service.ts: consulta y mapeo de la colección.

Si se copia a otra computadora sin node_modules, ejecutar primero npm.cmd install.
