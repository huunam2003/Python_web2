import { Input } from "antd";
import "../InputForm/style.scss";

function InputForm(props) {
  const { placeholder = "Nhập text", ...rests } = props;
  const handleOnChangeInput = (e) => {
    if (typeof props.onChange === 'function') {
      props.onChange(e.target.value);
    }
  }
  return (
      <Input className="Border_input" placeholder={placeholder} value={props.valueInput} {...rests} onChange={handleOnChangeInput}  />
  );
}

export default InputForm;
