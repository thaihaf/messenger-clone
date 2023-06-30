"use client";
import AuthSocialButton from "@/components/AuthSocialButton/AuthSocialButton";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { AuthEndPoint } from "@/constants/auth/auth.endpoints";
import { SocialActionsValues, VariantValues } from "@/constants/constants";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Paths } from "@/constants/paths";

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<String>(VariantValues.LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(Paths.USERS);
    }
  }, [router, session?.status]);

  const toggleVariant = useCallback(() => {
    if (variant === VariantValues.LOGIN) {
      setVariant(VariantValues.REGISTER);
    } else {
      setVariant(VariantValues.LOGIN);
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === VariantValues.REGISTER) {
      axios
        .post(AuthEndPoint.REGISTER, data)
        .then((response) => {
          toast.success("Register successfull", {
            duration: 6000,
            style: {
              minWidth: "250px",
            },
          });
          signIn("credentials", data);
        })
        .catch((error) => {
          toast.error(error.response.data, {
            duration: 6000,
            style: {
              minWidth: "250px",
            },
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === VariantValues.LOGIN) {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials", {
              duration: 6000,
              style: {
                minWidth: "250px",
              },
            });
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!", {
              duration: 6000,
              style: {
                minWidth: "250px",
              },
            });
            router.push(Paths.USERS);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action.toLowerCase(), { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials", {
            duration: 6000,
            style: {
              minWidth: "250px",
            },
          });
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!", {
            duration: 6000,
            style: {
              minWidth: "250px",
            },
          });
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === VariantValues.REGISTER && (
            <Input
              id="name"
              label={"Name"}
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label={"Email address"}
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label={"Password"}
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div className="">
            <Button fullWidth disabled={isLoading} type="submit">
              {variant === VariantValues.LOGIN
                ? VariantValues.LOGIN
                : VariantValues.REGISTER}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <div className="bg-white px-2 text-gray-500">
                Or continue with
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction(SocialActionsValues.GITGUB)}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction(SocialActionsValues.GOOGLE)}
            />
          </div>

          <div
            className="
            flex
            gap-2 justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
          "
          >
            <div>
              {variant === VariantValues.LOGIN
                ? "New an account?"
                : "Already have an account?"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === VariantValues.LOGIN ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
