import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@validations/signUpSchema";
import type { signUpType } from "@validations/signUpSchema";
import type { TuserData } from "@customTypes/userData";
import { useCheckEmailAvailability } from "@hooks/index";
import { Input } from "@components/Form/index";
import { actAuthRegister } from "@store/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import Spinner from "@components/feedback/Spinner/Spinner";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getFieldState,
        trigger,
        formState: { errors },
    } = useForm<signUpType>({
        mode: "onBlur",
        resolver: zodResolver(signUpSchema),
    });

    const submitForm: SubmitHandler<signUpType> = (data) => {
        dispatch(actAuthRegister(data as TuserData)).unwrap()
            .then(() => {
                navigate("/login");
            });
    };

    const {
        emailAvailabilityStatus,
        enteredEmail,
        checkEmailAvailability,
        resetCheckEmailAvailability,
    } = useCheckEmailAvailability();

    const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email");
        const value = e.target.value;
        const { isDirty, invalid } = getFieldState("email");

        if (isDirty && !invalid && enteredEmail !== value) {
            checkEmailAvailability(value);
        }

        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability();
        }
    };

    return (
        <>
            {/* Container */}
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

                    {/* Form */}
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

                        <Input
                            label="First Name"
                            name="firstName"
                            register={register}
                            error={errors.firstName?.message}
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            register={register}
                            error={errors.lastName?.message}
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            register={register}
                            onBlur={emailOnBlurHandler}
                            error={
                                errors.email?.message
                                    ? errors.email?.message
                                    : emailAvailabilityStatus === "notAvailable"
                                        ? "This email is already in use."
                                        : emailAvailabilityStatus === "failed"
                                            ? "Error from the server."
                                            : ""
                            }
                            formText={
                                emailAvailabilityStatus === "checking"
                                    ? "We're currently checking the email..."
                                    : ""
                            }
                            success={
                                emailAvailabilityStatus === "available"
                                    ? "This email is available for use."
                                    : ""
                            }
                            disabled={emailAvailabilityStatus === "checking"}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            register={register}
                            error={errors.confirmPassword?.message}
                        />

                        <button
                            type="submit"
                            disabled={emailAvailabilityStatus === "checking"
                                ? true
                                : false || loading === "pending"}
                            className="w-full py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed d-flex align-items-center justify-content-center gap-2"
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

export default Register;
