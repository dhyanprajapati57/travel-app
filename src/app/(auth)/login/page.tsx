"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/slice/authslice";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../../../../componenets/inputfaild";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.ok) {
      const user = await res.json();
      dispatch(login(user));
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials", { autoClose: 1000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 tracking-wide">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="transition-all duration-200 focus-within:scale-[1.02]">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
          </div>

          {/* Password */}
          <div className="transition-all duration-200 focus-within:scale-[1.02]">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
          </div>

          {/* Button */}
          <button
            className="
              w-full py-2 rounded-lg text-white font-medium
              bg-blue-600 hover:bg-blue-700 
              active:scale-95
              transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="
              text-blue-600 font-medium 
              hover:text-blue-800 hover:underline
              transition-all duration-200
            "
          >
            Register first
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
