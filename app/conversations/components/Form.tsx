"use client";

import { EndPoint } from "@/constants/endpoints";
import useConversation from "@/hooks/useConversations";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import Button from "@/components/Button/Button";
import { HiPaperAirplane } from "react-icons/hi";

export default function Form() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post(EndPoint.MESSAGES, {
      ...data,
      conversationId,
    });
  };
  return (
    <div
      className="
  py-4
  px-4
  bg-white
  border-t
  flex
 items-center
 gap-2
 lg:gap-4
 w-full
  "
    >
      <HiPhoto size={32} className="text-sky-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
      flex
      items-center
      gap-2
      lg:gap-4
      w-full
      "
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
        rounded-full
        p-2
        bg-sky-500
        cursor-pointer
        hover:bg-sky-600
        transition
        "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
