"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../../componenets/button";
import InputField from "../../../../componenets/inputfaild";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Registration successful!", { autoClose: 2000 });
      setTimeout(() => router.push("/login"), 1500);
    } else {
      const resp = await res.json();
      toast.error(resp.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Name"
          type="text"
          placeholder="Enter your name"
          register={register}
          name="name"
          error={errors.name?.message}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          name="email"
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          name="password"
          error={errors.password?.message}
        />

        <Button>Register</Button>
      </form>
      <ToastContainer />
    </div>
  );
}