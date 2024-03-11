import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return seterrorMessage("please fill al fields");
    }
    try {
      setLoading(true);
      seterrorMessage(null);
      const res = await axios.post("/api/auth/signup", formData);

      const data = await res.data;
      if (data.success === false) {
        return seterrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      seterrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <Link to="/" className=" font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sagar
              </span>
              Blog
            </Link>

            <p className="text-sm mt-5">
              This is a demo project you can sign up and password with google
            </p>

            <div className="flex-1">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <Label value="your username" />
                  <TextInput
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your Email" />
                  <TextInput
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Password" />
                  <TextInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
                <Button
                  gradientDuoTone="purpleToPink"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "signup"
                  )}
                </Button>
              </form>

              <div className="flex gap-2 text-sm mt-5">
                <span>Have an account ?</span>
                <Link to="/signin" className="text-blue-500">
                  Sign in
                </Link>
              </div>

              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
