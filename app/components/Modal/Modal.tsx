"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen }: ModalProps) {
  return <div>Modal</div>;
}
