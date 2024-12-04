import {SearchOutlined} from '@ant-design/icons';
import "../ButtonInputSearch/style.scss";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ButtonInputSearch(props) {
    const {size, placeholder, textButton, ...rest} = props
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate() 
    const handleNavigateSearch = () => {
        const name = "name";
        navigate(`/product/${name}/${searchValue}`)
      }
    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNavigateSearch();
        }
    };
    return ( 
        <div className="Search">
            <InputComponent 
                size= {size} 
                placeholder={placeholder} 
                bordered ="false" 
                className='Input'
                {...rest}   
                onChange={onChangeSearch}
                onKeyPress={onKeyPress}
            />
            <ButtonComponent 
                size= {size} 
                bordered ="false" 
                icon={<SearchOutlined />}  
                textButton={textButton}
                onClick={handleNavigateSearch}
            />
        </div>
     );
}

export default ButtonInputSearch;