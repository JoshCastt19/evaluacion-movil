import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getProductos } from './services/productos.service';
import type { Producto } from './types/producto';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const datos = await getProductos();
        if (activo) setProductos(datos);
      } catch {
        if (activo) setError('No se pudieron cargar los productos. Revisa tu conexión e intenta otra vez.');
      } finally {
        if (activo) setLoading(false);
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, [intento]);

  function reintentar() {
    setError('');
    setLoading(true);
    setIntento(intento + 1);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contenedor}>
        <StatusBar style="dark" />
        {seleccionado ? (
          <ScrollView contentContainerStyle={styles.detalle}>
            <Button title="Volver a la lista" onPress={() => setSeleccionado(null)} />
            <Image source={seleccionado.imagen} style={styles.imagenDetalle} resizeMode="contain" />
            <Text style={styles.titulo}>{seleccionado.nombre}</Text>
            <Text style={styles.precio}>$ {seleccionado.precio.toFixed(2)}</Text>
            <Text style={styles.texto}>Categoría: {seleccionado.categoria}</Text>
            <Text style={styles.subtitulo}>Descripción</Text>
            <Text style={styles.texto}>{seleccionado.descripcion}</Text>
          </ScrollView>
        ) : (
          <View style={styles.contenido}>
            <Text style={styles.titulo}>Productos</Text>
            {loading ? (
              <View style={styles.mensaje}>
                <ActivityIndicator size="large" color="#2563a6" />
                <Text style={styles.texto}>Cargando productos...</Text>
              </View>
            ) : error ? (
              <View style={styles.mensaje}>
                <Text style={styles.error}>{error}</Text>
                <Button title="Reintentar" onPress={reintentar} />
              </View>
            ) : (
              <FlatList
                data={productos}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.tarjeta}
                    onPress={() => setSeleccionado(item)}
                    accessibilityRole="button"
                    accessibilityLabel={'Ver detalle de ' + item.nombre}
                  >
                    <Image source={item.imagen} style={styles.imagen} resizeMode="contain" />
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.precio}>$ {item.precio.toFixed(2)}</Text>
                  </Pressable>
                )}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  contenido: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lista: {
    paddingBottom: 16,
  },
  tarjeta: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  imagen: {
    width: '100%',
    height: 150,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 16,
    marginBottom: 8,
  },
  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detalle: {
    padding: 16,
  },
  imagenDetalle: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
    marginVertical: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
  },
  mensaje: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  error: {
    color: '#a32020',
    fontSize: 16,
    textAlign: 'center',
  },
});
