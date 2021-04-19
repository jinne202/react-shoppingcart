import React from "react";
import styled from 'styled-components';
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

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
          <RegisterWrapper>
            <RegisterTitle>REGISTER</RegisterTitle>
            <FormWrapper onSubmit={handleSubmit} >
              <InputWrapper>
                <Label>NAME</Label>
                <InputBox
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </InputWrapper>

              <InputWrapper>
                <Label>E-MAIL</Label>
                <InputBox
                  id="email"
                  placeholder="abc@xyz.com"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                />
                {errors.password && touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <Label>PASSWORD CHECK</Label>
                <InputBox
                  id="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </InputWrapper>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                REGISTER
              </Button>
            </FormWrapper>
            <LoginButton>
              Have account? <a href="/login">Login now</a>
            </LoginButton>
          </RegisterWrapper>
        );
      }}
    </Formik>
  );
};

const RegisterWrapper = styled.div`
  width : 500px;
  margin : 0 auto;
  padding : 170px 0 0 0;

  @media (max-width : 500px) {
    width : 90%;
  }
`

const RegisterTitle = styled.div`
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
  width : 100%;
`

const LoginButton = styled.div`

  text-align : center;
  margin : 30px 0 100px 0;

  & > a {
    color : black;
    text-decoration : none;
    font-weight : 700;
  }
`


export default RegisterPage;
