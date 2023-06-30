"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
export default function MobileItem({
  icon: Icon,
  href,
  onClick,
  active,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        `group
      flex
      gap-x-3
      text-sm
      leading-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-500
      hover:text-black
      hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}
