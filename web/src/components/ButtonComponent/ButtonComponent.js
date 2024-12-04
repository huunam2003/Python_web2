import { Button } from "antd";

function ButtonComponent({size, textButton,onClick, ...rests}) {
    return ( 
        <Button
            size= {size} 
            bordered ="false" 
            onClick={onClick}
            {...rests}

        >
            <span>{textButton}</span>
        </Button>
     );
}

export default ButtonComponent;