// import { Checkbox, Rate } from "antd";
import "../NavbarComponent/style.scss";
function NavbarComponent() {
    // const onChange = () => {};
    const renderContent = (type, options) => {
        switch (type) {
        case 'text':
            return options.map((option, index) => {
                return <div key={index} className="TextValue">{option}</div>;
            });
        // case 'checkbox':
        //     return(
        //     <Checkbox.Group style={{ width: "100%", display:'flex', flexDirection: 'column', gap:'12px'}} onChange={onChange}>
        //         {options.map((option) => {
        //             return (
        //             <Checkbox 
        //                 key={option.value} 
        //                 style={{marginLeft:'0'}} 
        //                 value={option.value}
        //             >
        //                 {option.label}
        //             </Checkbox>
        //             )
        //         })}
        //     </Checkbox.Group>
        //     );
        // case 'star':
        //     return options.map((option, index) => {
        //                 return (
        //                     <div key={index} className="Rate">
        //                         <Rate style={{ fontSize:'12px' }}disabled defaultValue={option} />
        //                         <span>{`tu ${option} sao`}</span>
        //                     </div>
        //                 )
        //             })
        // case 'price':
        //     return options.map((option, index) => {
        //                 return (
        //                     <div key={index} className="Price_Navbar">{option}</div>
        //                 )
        //             })
        default:
            return {};
        }
    };
    return (
        <div >
            <div className="LabelText">Label</div>
            <div className="Content">
                {renderContent("text", ["tu lanh", "TV", "may giat"])}
            </div>
            {/* <div className="Content">
                {renderContent("checkbox", [
                        {value: 'a', label:'A'},
                        {value: 'b', label:'B'},
                ])}
            </div>
            <div className="Content">
                {renderContent("star", [3,4,5])}
            </div>
            <div className="Content">
                {renderContent("price", ['duoi 40.000', 'tren 50.000' ])}
            </div> */}
        </div>
    );
}

export default NavbarComponent;
