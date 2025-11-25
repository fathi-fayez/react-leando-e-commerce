import { useEffect } from "react";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@validations/signInSchema";
import type { signInType } from "@validations/signInSchema";
import type { TuserData } from "@customTypes/userData";
import { Input } from "@components/Form";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import Spinner from "@components/feedback/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signInType>({
        mode: "onBlur",
        resolver: zodResolver(signInSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(resetUI());
        };
    }, [dispatch]);

    const submitForm: SubmitHandler<signInType> = (data) => {
        dispatch(actAuthLogin(data as TuserData)).unwrap()
            .then(() => {
                navigate("/");
            });
    };

    return (
        <>

            {/* Center Form */}
            <div className="flex justify-center mt-6">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm">

                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

                        <Input
                            name="email"
                            label="Email Address"
                            register={register}
                            error={errors.email?.message}
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            register={register}
                            error={errors.password?.message}
                        />
                        <button
                            type="submit"
                            disabled={loading === "pending"}
                            className="w-full py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 gap-2"
                        >
                            {loading === "pending" ? (
                                <>
                                    <Spinner /> Loading...
                                </>
                            ) :
                                "Submit"
                            }
                        </button>
                        {error && (
                            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
                        )}

                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
