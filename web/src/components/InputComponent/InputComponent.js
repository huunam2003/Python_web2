import { Input } from "antd";

function InputComponent({size, placeholder, ...rests}) {
    return ( 
        <Input 
            size= {size} 
            placeholder={placeholder} 
            bordered ="false" 
            className='Input'
            {...rests}    
        />
     );
}

export default InputComponent;