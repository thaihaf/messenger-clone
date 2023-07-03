import { User } from "@prisma/client";
import React from "react";

interface UserBoxProps {
  data: User;
}
export default function UserBox({ data }: UserBoxProps) {
  return <div>UserBox</div>;
}
