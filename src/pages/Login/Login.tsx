import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@validations/signInSchema";
import type { signInType } from "@validations/signInSchema";
import { Input } from "@components/Form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signInType>({
        mode: "onBlur",
        resolver: zodResolver(signInSchema),
    });

    const submitForm: SubmitHandler<signInType> = (data) => {
        console.log(data);
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
                            className="
                w-full bg-sky-600 text-white py-2 rounded-md 
                hover:bg-sky-700 transition 
              "
                        >
                            Submit
                        </button>

                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
