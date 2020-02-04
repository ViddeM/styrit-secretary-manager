import React from "react";
import {
    DigitForm,
    DigitButton,
    DigitText,
    DigitFormField
} from "@cthit/react-digit-components";
import * as yup from "yup";
import { FormContainer, CodeTextField } from "./Code.styles.screen";

export const Code = props => (
    <DigitForm
        onSubmit={(values, actions) => {
            props.submitCode(values.code);
        }}
        initialValues={{ code: "" }}
        validationSchema={yup.object().shape({
            code: yup.string().required("Koden kan inte vara tom.")
        })}
        render={({ errors }) => (
            <FormContainer>
                {props.error && (
                    <DigitText.Text text={props.error} color="error" bold />
                )}
                <DigitFormField
                    name="code"
                    component={CodeTextField}
                    componentProps={{
                        variant: "outlined",
                        size: "medium",
                        label: "Kod",
                        style: { marginBottom: "20px", minWidth: "325px" }
                    }}
                />
                <DigitButton primary raised submit text="Nästa" />
            </FormContainer>
        )}
    />
);

export default Code;

/*
                        label="kod"
                        variant="outlined"
                        onChange={event => {
                            const text = event.target.value;
                            this.setState((state, props) => ({
                                code: text
                            }));
                        }}
                        style={{ marginBottom: "20px", minWidth: "325px" }}
                    />
                    */
