// import { StyleSheet, Text, View,FlatList } from 'react-native';
// import SearchBar from '@/src/components/SearchBar';
// import CategoryList from '@/src/components/CategoryList';
// import ProductCard from '@/src/components/ProductCard';

// export default function HomeScreen() {
// const products = [
//     {
//         id: 1,
//         title: 'Essence Mascara',
//         price: 9.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
//     },
//     {
//         id: 2,
//         title: 'Eyeshadow Palette',
//         price: 19.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp'
//     },
//     {
//         id: 3,
//         title: 'Powder Canister',
//         price: 14.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'
//     },
//     {
//         id: 4,
//         title: 'Red Lipstick',
//         price: 12.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'
//     }
// ];


//     return (
//         <View style={styles.container}>
//         <Text style={styles.title}>ShopEasy</Text>

//         <Text style={styles.subtitle}>
//             Find products you love
//         </Text>

//         <SearchBar />
//         <CategoryList/>

//         <Text style={styles.productHeading}>
//             Featured Products
//         </Text>

//         <FlatList
//             data={products}
//             numColumns={2}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//                 <ProductCard
//                     title={item.title}
//                     price={item.price}
//                     image={item.image}
//                 />
//             )}
//         />
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
//         fontWeight: 'bold'
//     },

//     subtitle: {
//         marginTop: 5,
//         fontSize: 16
//     },
//     productHeading: {
//     marginTop: 25,
//     marginBottom: 15,
//     fontSize: 20,
//     fontWeight: 'bold'
// }
// });





import { FlatList, StyleSheet, Text, View,Pressable } from 'react-native';
import SearchBar from '@/src/components/SearchBar';
import CategoryList from '@/src/components/CategoryList';
import ProductCard from '@/src/components/ProductCard';
import { router } from 'expo-router';
import { getCategories, getProducts,searchProducts ,getProductsByCategory} from '@/src/services/api';
import { useState,useEffect } from 'react';
import { Product } from '@/src/types/product';

// const products = [
//     {
//         id: 1,
//         title: 'Essence Mascara',
//         price: 9.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
//     },
//     {
//         id: 2,
//         title: 'Eyeshadow Palette',
//         price: 19.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp'
//     },
//     {
//         id: 3,
//         title: 'Powder Canister',
//         price: 14.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp'
//     },
//     {
//         id: 4,
//         title: 'Red Lipstick',
//         price: 12.99,
//         image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp'
//     }
// ];




export default function HomeScreen() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categories,setCategories]=useState<any[]>([]);
  const [selectedCategory,setSelectedCategory]=useState('');


  const fetchProducts = async () => {
    try {
        setLoading(true);
        setError('');

        const data = search.trim()
            ? await searchProducts(search.trim())
            : await getProducts();

        setProducts(data);
    } catch (error) {
        setError('Failed to load products');
    } finally {
        setLoading(false);
    }
};

const fetchCategories=async()=>{
  try{
    const data=await getCategories();
    setCategories(data);
  }
  catch(error){
    console.log(error);
  }
}

const handleCategorySelect = async (category: string) => {
    try {
        setLoading(true);
        setError('');

        setSelectedCategory(category);
        setSearch('');

        const data = category
            ? await getProductsByCategory(category)
            : await getProducts();

        setProducts(data);
    } catch (error) {
        setError('Failed to load products');
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
      fetchProducts();
      fetchCategories();
  }, []);

  const categoryData = [
    {
        slug: '',
        name: 'All'
    },
    ...categories
];

    if (loading) {
    return (
        <View style={styles.loading}>
            <Text>Loading products...</Text>
        </View>
    );
  }



  if (error) {
    return (
        <View style={styles.loading}>
            <Text>{error}</Text>

            <Pressable
                style={styles.retryButton}
                onPress={fetchProducts}
            >
                <Text style={styles.retryText}>
                    Retry
                </Text>
            </Pressable>
        </View>
    );
}
    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.row}

            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>
                        ShopEasy
                    </Text>

                    <Text style={styles.subtitle}>
                        Find products you love
                    </Text>

                    <SearchBar
                        value={search}
                        onChangeText={setSearch}
                    />

                    <Pressable
                        style={styles.searchButton}
                        onPress={fetchProducts}
                    >
                        <Text style={styles.searchButtonText}>
                            Search
                        </Text>
                    </Pressable>

                    <CategoryList 
                      categories={categoryData}
                      selectedCategory={selectedCategory}
                      onSelectCategory={handleCategorySelect}
                    />

                    <Text style={styles.heading}>
                        Featured Products
                    </Text>
                </View>
            }

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
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },

    subtitle: {
        marginTop: 5,
        fontSize: 16
    },

    heading: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },

    row: {
        justifyContent: 'space-between'
    },
    loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  searchButton: {
      marginTop: 10,
      backgroundColor: 'black',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center'
  },

  searchButtonText: {
      color: 'white',
      fontWeight: 'bold'
  }
});