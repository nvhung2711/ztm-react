import { useState } from "react";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { signInUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-in-form.style.scss';

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: ''
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userCredential = await signInUserWithEmailAndPassword(email, password);
            console.log(userCredential);
            resetFormFields();
        } catch (err) {
            if(err.code == 'auth/invalid-credential') {
                alert('Invalid credential');
            } else {
                console.log('Error signing in', err.code);
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;