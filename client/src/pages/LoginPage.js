import React, { useState } from "react";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { loginUser } from "../reducers/userReducer";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Email or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Email or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <LoginWrapper>
            <LoginTitle>LOGIN</LoginTitle>
            <FormWrapper onSubmit={handleSubmit}>
              <InputWrapper>
                <Label>E-MAIL</Label>
                <InputBox
                  id="email"
                  placeholder="abc@xyz.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && touched.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>PASSWORD</Label>
                <InputBox
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.password && touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </InputWrapper>
              {formErrorMessage && (
                <FormError>{formErrorMessage}</FormError>
              )}
              <Button htmlType="submit" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                LOGIN
              </Button>
            </FormWrapper>
            <RegisterButton>
              New account? <a href="/register">Register now</a>
            </RegisterButton>
          </LoginWrapper>
        );
      }}
    </Formik>
  );
};

const LoginWrapper = styled.div`
  width : 500px;
  margin : 0 auto;
  padding : 170px 0 0 0;

  @media (max-width : 500px) {
    width : 90%;
  }
`

const LoginTitle = styled.div`
  font-size : 30px;
  font-weight : 500;
  font-family: 'Poppins', sans-serif;
  text-align : center;
  margin : 0 0 60px 0;
`

const FormWrapper = styled.form`
`

const InputWrapper = styled.div`
  width : 100%;
  margin : 0 0 60px 0;
`

const Label = styled.label`
  display : block;
  margin : 0 0 20px 0;
  font-size : 14px;
`

const InputBox = styled.input`
  border : 0;
  width : 100%;
  font-size : 14px;
  border-bottom : 2px solid black;
  outline : none;
  background-color : transparent;
  padding : 5px 0;
  font-family: 'Poppins', sans-serif;
`

const ErrorMessage = styled.div`
  margin : 10px 0 0 0;
  color : red;
  font-family: 'Poppins', sans-serif;
`

const Button = styled.button`
  border : 0;
  font-family: 'Poppins', sans-serif;
  outline : none;
  background-color : black;
  padding : 20px 0;
  color : white;
  font-weight : 600;
  cursor : pointer;
`

const RegisterButton = styled.div`

  text-align : center;
  margin : 30px 0 100px 0;

  & > a {
    color : black;
    text-decoration : none;
    font-weight : 700;
  }
`

const FormError = styled.div`
  font-size : 14px;
  color : red;
  font-weight : 700;
  margin : 0 0 10px 0;
`

export default withRouter(LoginPage);


