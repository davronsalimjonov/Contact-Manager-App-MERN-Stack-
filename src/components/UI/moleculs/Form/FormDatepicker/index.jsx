import DatePicker from "@/components/UI/atoms/Form/DatePicker";
import FormElementWrapper from "../FormElementWrapper";

const FormDatepicker = ({
    label = ''
}) => {
    return (
        <FormElementWrapper label={label}>
            <DatePicker />
        </FormElementWrapper>
    );
}

export default FormDatepicker;