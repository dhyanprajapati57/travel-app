"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../../componenets/common/inputfaild";
import { Button } from "../../componenets/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../../utils/schema/authschema";
import RegisterSkeleton from "@/app/componenets/Skeleton/registerskeleton";

export default function Register() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  //  Skeleton on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

 const onSubmit = async (data: RegisterFormData) => {
  setIsSubmitting(true);

  try {
    const res = await dispatch(registerUser(data));

    console.log("RES:", res); 

    toast.success(res.message || "Registration successful", {
      autoClose: 1000,
    });

    router.push("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log("ERROR:", err?.response?.data || err);

    toast.error(
      err?.response?.data?.message || err.message || "Something went wrong"
    );
  } finally {
    setIsSubmitting(false);
  }
};
  //  Show skeleton first
  if (!isMounted) {
    return <RegisterSkeleton />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Name"
            type="text"
            placeholder="Enter name"
            name="name"
            register={register}
            error={errors.name?.message}
          />

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
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-5 py-2 text-sm rounded-lg"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}