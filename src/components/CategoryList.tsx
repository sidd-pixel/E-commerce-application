import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// const categories = [
//     'Beauty',
//     'Fragrances',
//     'Furniture',
//     'Groceries'
// ];

export default function CategoryList({categories,selectedCategory,onSelectCategory}:any){
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Categories</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((category:any)=>(
                    <Pressable
                        key={category.slug}
                        style={[
                            styles.category,
                            selectedCategory===category.slug && styles.selected
                        ]}
                        onPress={()=>{
                            onSelectCategory(category.slug);
                        }}
                    >
                        <Text>{category.name}</Text>

                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },

    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },

    category: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginRight: 10
    },

    selected: {
        backgroundColor: '#ddd'
    }
});