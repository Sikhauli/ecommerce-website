import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaQuoteLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Button,
    Input,
} from "@nextui-org/react";
import {
    API,
    AUTH_ENDPOINTS,
    getAxiosError,
} from "../../helpers/constants.js";
import { websiteTitle } from "../../helpers/const_data.js"
import { RiDoubleQuotesL } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// bg-image
import backgroundImage from '../../assets/Login-amico.png';

import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";
import { setUser } from "../../redux/slices/userSlice";
import { useSnackbar } from "notistack";

const Signin = () => {

    const currentUser = useSelector((state) => state.user.value);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const navToHome = () => navigate("/");
    const navToDashboard = () => navigate("/admin");

      const LoginRoutes = (currentUser) => {
        if(currentUser){
          if(currentUser.userType === "ADMIN"){
            navToDashboard()
          }else if(currentUser.userType === "CUSTOMER"){
            navToHome()
          }
        }
      }

    const onChange = (e) => {
        e?.preventDefault();

        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

  const submit = (e) => {
      e.preventDefault();
      dispatch(showLoading());
      API.post(AUTH_ENDPOINTS.login, userData)
          .then((response) => {
              dispatch(setUser(response?.data));
              LoginRoutes(response?.data);
          })
          .catch((error) =>
              enqueueSnackbar(getAxiosError(error), {
                  variant: "error",
              })
          )
          .finally(() => dispatch(hideLoading()));
        };

    return (
        <div className="grid grid-cols-[36rem_1fr]">
            {/* left */}
            <div className="p-12 min-h-screen flex flex-col justify-center ">
                <div className="mb-16">
                    <h1 className="text-4xl font-semibold text-center mb-2 font-serif">
                        Welcome back 👋
                    </h1>
                    <p className="text-sm text-center text-default-500 font-serif">
                        Welcome back! Let&#39;s make this chapter of your online shopping adventure a
                        remarkable success!
                    </p>
                </div>

                <form onSubmit={submit} className="">
                    <Input
                        type="email"
                        labelPlacement="outside"
                        label="Email"
                        name="email"
                        value={userData.email}
                        placeholder="Enter your email"
                        className="mb-12"
                        size="lg"
                        radius="sm"
                        variant="bordered"
                        onChange={onChange}
                    />

                    <Input
                        type="password"
                        labelPlacement="outside"
                        label="Password"
                        name="password"
                        value={userData.password}
                        placeholder="Enter your password"
                        className=""
                        size="lg"
                        radius="sm"
                        variant="bordered"
                        onChange={onChange}
                    />
                    <div className="flex items-center justify-center mt-2">
                        <p className="text-xs cursor-pointer text-default-500 ml-auto font-serif">
                            Forgot password?
                            <Link href="forgot-password">
                                <text className="ml-1 text-primary underline font-serif">Reset it here</text>
                            </Link>
                        </p>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        radius="sm"
                        className="mt-4 w-full"
                    >
                        Sign in
                    </Button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-default-100" />
                    <span className="mx-2 text-default-500 text-sm font-serif">OR</span>
                    <hr className="flex-grow border-t border-default-100" />
                </div>
                <div className="flex items-center justify-center">
                    <FcGoogle size={20} className='mr-6 cursor-pointer' />
                    <FaGithub size={20} className='cursor-pointer' />
                </div>

                <div className="flex items-center justify-center mt-6">
                    <p className="text-sm cursor-pointer text-default-500 font-serif">
                        Don't have an account yet?
                        <Link to="/register" className="ml-1 text-primary underline font-serif">Sign up</Link>
                    </p>
                </div>
            </div>

            {/* right */}
            <Card className="m-4 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <CardFooter
                    style={{
                        backgroundImage:
                            "radial-gradient(circle farthest-side, transparent 10%, rgba(0,0,0,.65) 100%)",
                    }}
                    className="p-6 h-full text-white flex-col items-start justify-end"
                >
                    <div className="">
                        <RiDoubleQuotesL className="mb-3 text-4xl" />
                        <p className="leading-7 font-serif">
                            Welcome to {websiteTitle}! Your destination for the latest fashion and lifestyle products.
                            Discover stylish clothing, accessories, and home decor at affordable prices.
                            Enjoy fast shipping and excellent customer service. Stay trendy with {websiteTitle}!
                        </p>
                        <p className="mt-4 font-serif">&#45;{websiteTitle}</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signin;
