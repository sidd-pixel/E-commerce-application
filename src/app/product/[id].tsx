import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    ScrollView
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProductById } from '@/src/services/api';
import { Product } from '../../types/product';
import { saveCart, getCart } from '@/src/services/cart';

export default function ProductDetailsScreen() {

    const { id } = useLocalSearchParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [added, setAdded] = useState(false);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await getProductById(id as string);

            setProduct(data);
        } catch (error) {
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) {
            return;
        }

        const cart = await getCart();

        const existingProduct = cart.find(
            (item: any) => item.id === Number(id)
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        await saveCart(cart);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading product...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>

                <Pressable
                    style={styles.retryButton}
                    onPress={fetchProduct}
                >
                    <Text style={styles.retryText}>
                        Retry
                    </Text>
                </Pressable>
            </View>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.card}>

                <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>
                    {product.title}
                </Text>

                <Text style={styles.price}>
                    ₹{product.price}
                </Text>

                <Text style={styles.description}>
                    {product.description}
                </Text>

            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                    added && styles.buttonAdded
                ]}
                onPress={handleAddToCart}
            >
                <Text style={styles.buttonText}>
                    {added ? '✓ Added to Cart' : 'Add to Cart'}
                </Text>
            </Pressable>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        padding: 20,
        backgroundColor: 'white'
    },

    image: {
        width: '100%',
        height: 280,
        marginBottom: 15
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32
    },

    price: {
        marginTop: 12,
        fontSize: 22,
        fontWeight: 'bold'
    },

    description: {
        marginTop: 18,
        fontSize: 16,
        lineHeight: 25,
        color: '#555'
    },

    button: {
        backgroundColor: 'black',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20
    },

    buttonPressed: {
        opacity: 0.6,
        transform: [{ scale: 0.98 }]
    },

    buttonAdded: {
        backgroundColor: 'green'
    },

    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },

    retryButton: {
        marginTop: 15,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8
    },

    retryText: {
        color: 'white',
        fontWeight: 'bold'
    }
});