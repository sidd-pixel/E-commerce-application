// import { useCallback, useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet,
//     Image,
//     Pressable
// } from 'react-native';
// import { useFocusEffect } from 'expo-router';

// import { getCart, saveCart } from '@/src/services/cart';

// export default function CartScreen() {
//     const [cart, setCart] = useState<any[]>([]);

//     const loadCart = async () => {
//         const data = await getCart();
//         setCart(data);
//     };

//     useFocusEffect(
//         useCallback(() => {
//             loadCart();
//         }, [])
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Cart</Text>

//             <FlatList
//                 data={cart}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.item}>
//                         <Image
//                             source={{ uri: item.thumbnail }}
//                             style={styles.image}
//                         />

//                         <View style={styles.info}>
//                             <Text style={styles.name}>
//                                 {item.title}
//                             </Text>

//                             <Text>
//                                 ${item.price}
//                             </Text>

//                             <Text>
//                                 Quantity: {item.quantity}
//                             </Text>
//                         </View>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20
//     },

//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 20
//     },

//     item: {
//         flexDirection: 'row',
//         marginBottom: 20
//     },

//     image: {
//         width: 100,
//         height: 100,
//         resizeMode: 'contain'
//     },

//     info: {
//         flex: 1,
//         marginLeft: 15,
//         justifyContent: 'center'
//     },

//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10
//     }
// });




import { useCallback, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Pressable
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import { getCart, saveCart } from '@/src/services/cart';

export default function CartScreen() {

    const [cart, setCart] = useState<any[]>([]);

    const loadCart = async () => {
        const data = await getCart();
        setCart(data);
    };

    useFocusEffect(
        useCallback(() => {
            loadCart();
        }, [])
    );

    const increaseQuantity = async (id: number) => {
        const updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const decreaseQuantity = async (id: number) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const removeItem = async (id: number) => {
        const updatedCart = cart.filter(
            (item) => item.id !== id
        );

        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                My Cart
            </Text>

            {cart.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                        Your cart is empty
                    </Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        renderItem={({ item }) => (
                            <View style={styles.item}>

                                <Image
                                    source={{
                                        uri: item.thumbnail
                                    }}
                                    style={styles.image}
                                    resizeMode="contain"
                                />

                                <View style={styles.info}>

                                    <Text
                                        style={styles.name}
                                        numberOfLines={2}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text style={styles.price}>
                                        ₹{item.price}
                                    </Text>

                                    <View style={styles.actions}>

                                        <Pressable
                                            style={styles.quantityButton}
                                            onPress={() =>
                                                decreaseQuantity(item.id)
                                            }
                                        >
                                            <Text style={styles.quantityText}>
                                                −
                                            </Text>
                                        </Pressable>

                                        <Text style={styles.quantity}>
                                            {item.quantity}
                                        </Text>

                                        <Pressable
                                            style={styles.quantityButton}
                                            onPress={() =>
                                                increaseQuantity(item.id)
                                            }
                                        >
                                            <Text style={styles.quantityText}>
                                                +
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() =>
                                                removeItem(item.id)
                                            }
                                        >
                                            <Text style={styles.remove}>
                                                Remove
                                            </Text>
                                        </Pressable>

                                    </View>

                                </View>

                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>

                        <Text style={styles.total}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </>
            )}

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

    item: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12
    },

    image: {
        width: 100,
        height: 100
    },

    info: {
        flex: 1,
        marginLeft: 15
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    price: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },

    quantityButton: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    quantityText: {
        fontSize: 20
    },

    quantity: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: 'bold'
    },

    remove: {
        marginLeft: 15,
        color: 'red',
        fontWeight: 'bold'
    },

    totalContainer: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyText: {
        fontSize: 18,
        color: '#777'
    }
});