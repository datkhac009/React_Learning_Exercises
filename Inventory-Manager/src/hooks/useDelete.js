import { useState } from "react"

export const useDelete = (url) => {
const [isDeleteting,setIsDeleteting] = useState(false);
const [error,setError] = useState(null);

async function DeleteProduct(id) {
    try {
        setIsDeleteting(true)
        const res = await fetch(`${url.replace(/\/$/, "")}/products/${id}`,{
            method:"DELETE"
        })
        if(!res.ok){
            throw new Error(`Cannot delete product: ${res.status}`);
        }
        const deleteted = await res.json()
        return deleteted;
    } catch (error) {
        setError(error)
        console.log(error)
    }finally{
        setIsDeleteting(false)
    }
}
   
    
    return{DeleteProduct, isDeleteting, error}
}