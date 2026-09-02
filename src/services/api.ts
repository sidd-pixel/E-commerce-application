const BASE_URL='https://dummyjson.com';

export const getProducts=async()=>{
    const response = await fetch(
        `${BASE_URL}/products`
    );

    if(!response.ok){
        throw new Error('Failed to fetch products')
    }
    
    const data=await response.json();
    console.log(data);

    return data.products;
}

export const getProductById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data;
};

export const searchProducts = async (query: string) => {
    const response = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error('Failed to search products');
    }

    const data = await response.json();

    return data.products;
};


export const getCategories=async()=>{
    const response =await fetch(`${BASE_URL}/products/categories`);
    
    if(!response.ok){
        throw new Error('Failed to fetch categories')
    }

    const data=await response.json();
    return data;
}


export const getProductsByCategory = async (category: string) => {
    const response = await fetch(
        `${BASE_URL}/products/category/${category}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return data.products;
};