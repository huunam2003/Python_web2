import { useNavigate } from "react-router-dom";

function TypeProduct({name} ,{column}) {
    const navigate = useNavigate()
    const handleNavigatetype = (type, column) => {
        navigate(`/product/${column}/${type}`)
    } 

    return ( 
        <div style={{padding: '10px', cursor:'pointer'}} onClick={() =>handleNavigatetype(name,'type')}>{name}</div> 
);
}

export default TypeProduct;