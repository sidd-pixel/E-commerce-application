import { StyleSheet, TextInput } from 'react-native';

export default function SearchBar({
    value,
    onChangeText
}: any) {
    return (
        <TextInput
            style={styles.input}
            placeholder="Search products..."
            value={value}
            onChangeText={onChangeText}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 16
    }
});