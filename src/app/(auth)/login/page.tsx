"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/authslice";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../../componenets/inputfaild";
import Button from "../../componenets/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../schema/authschema";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});

  const onSubmit = async (data: FormData) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful", { autoClose: 1000 });
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials", { autoClose: 1000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter email"
            name="email"
            register={register}
            error={errors.email?.message}
          />

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" className="w-auto px-5 py-2 text-sm rounded-lg">
            Login
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Dont have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
