import {SearchOutlined} from '@ant-design/icons';
import "../ButtonInputSearch/style.scss";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function ButtonInputSearch(props) {
    const {size, placeholder, textButton, ...rest} = props
    return ( 
        <div className="Search">
            <InputComponent 
                size= {size} 
                placeholder={placeholder} 
                bordered ="false" 
                className='Input'
                {...rest}     
            />
            <ButtonComponent 
                size= {size} 
                bordered ="false" 
                icon={<SearchOutlined />}  
                textButton={textButton}
            />
        </div>
     );
}

export default ButtonInputSearch;