import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import the custom CSS file
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import img1 from './images/Ellipse 2.png';
import img2 from './images/Ellipse 3.png';
import img3 from './images/Ellipse 4.png';
import img4 from './images/Ellipse 5.png';
import google from './images/search 1.png';
import facebook from './images/facebook 1.png';
import * as Yup from 'yup';

const About = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Email is not valid'),
      password: Yup.string()
        .required('Password is required')
        .matches(/^[A-Z][a-z]{5,10}$/, 'Password must be between 6 to 11 characters and start with an uppercase letter'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      handleRegister(values);
    },
  });

  const handleRegister = (data) => {
    console.log('Data to be sent:', data);

    fetch('https://wallyt.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + 'YOUR_BEARER_TOKEN', // Replace with your actual bearer token
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Response data:', JSON.stringify(data));
      })
      .catch((err) => {
        console.error('Error:', err.message);
      });
  };

  return (
    <div className="page-container">
      {/* Login Section */}
      <div className="login-content">
        <h2 className="login-header">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="button btn-primary w-100">Sign In</button>
          <div className="link-text text-end mt-3">
            <Link to="/Forgotpass">Forgot Password?</Link>
          </div>
        </form>

        <div className="or-divider">-OR-</div>

        <div className="button btn-google w-100 mb-3">
          <img src={google} alt="Google Logo" />
          Sign in with Google
        </div>
        <div className="button btn-facebook w-100">
          <img src={facebook} alt="Facebook Logo" />
          Sign in with Facebook
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-content">
        <div className="circle-image large-circle">
          <img src={img1} alt="Large Testimonial" />
        </div>
        <div className="circle-image medium-circle">
          <img src={img2} alt="Medium Testimonial" />
        </div>
        <div className="circle-image small-circle"  style={{marginBottom:'20%'}}>
          <img src={img3} alt="Small Testimonial" />
        </div>
        <div className="circle-image extra-small-circle">
          <img src={img4} alt="Extra Small Testimonial" />
        </div>

        <div className="testimonial-box">
          <p>
            This website helped me check reviews for items I bought before having any regrets.
          </p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <span>Tania, Gadget enthusiast</span>
        </div>
      </div>
    </div>
  );
};

export default About;
