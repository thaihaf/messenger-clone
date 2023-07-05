"use client";

import { FullMessageType } from "@/constants/types";
import useConversation from "@/hooks/useConversations";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { EndPoint } from "@/constants/endpoints";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}
export default function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`${EndPoint.CONVERSATIONS}/${conversationId}`);
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          data={message}
          key={message.id}
          isLast={i === messages.length - 1}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
