"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/auth.slice";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../../componenets/common/inputfaild";
import { Button } from "../../componenets/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../utils/schema/authschema";
import LoginSkeleton from "@/app/componenets/Skeleton/loginskeleton";

export default function Login() {
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  //  Prevent hydration + show skeleton briefly
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const res = await dispatch(loginUser(data));

      if (res?.status === 200) {
        toast.success("Login Successful", { autoClose: 1000 });
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials", { autoClose: 1000 });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Skeleton first
  if (!isMounted) {
    return <LoginSkeleton />;
  }

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
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}