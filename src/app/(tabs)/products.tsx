import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import ProductCard from '@/src/components/ProductCard';
import { getProducts } from '@/src/services/api';
import { router } from 'expo-router';

export default function ProductsScreen() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await getProducts();

            setProducts(data);
        } catch (error) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Products</Text>

            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        title={item.title}
                        price={item.price}
                        image={item.thumbnail}
                        onPress={() =>
                            router.push(`/product/${item.id}`)
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});