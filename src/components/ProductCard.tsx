import {
    Image,
    Pressable,
    StyleSheet,
    Text
} from 'react-native';

type ProductCardProps = {
    title: string;
    price: number;
    image: string;
    onPress: () => void;
};

export default function ProductCard({
    title,
    price,
    image,
    onPress
}: ProductCardProps) {
    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
        >
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
            />

            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {title}
            </Text>

            <Text style={styles.price}>
                ${price}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10
    },

    image: {
        width: '100%',
        height: 150
    },

    title: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },

    price: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
});