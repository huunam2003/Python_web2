import { Button } from "antd";

function ButtonComponent({size, textButton, ...rests}) {
    return ( 
        <Button
            size= {size} 
            bordered ="false" 
            {...rests}
        >
            <span>{textButton}</span>
        </Button>
     );
}

export default ButtonComponent;