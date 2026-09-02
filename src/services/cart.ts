import AsyncStorage from '@react-native-async-storage/async-storage'

const CART_KEY='cart';

export const getCart=async()=>{
    const data=await AsyncStorage.getItem(CART_KEY);

    if(!data){
        return [];
    }
    return JSON.parse(data);
};

export const saveCart=async(cart:any[])=>{
    await AsyncStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
};