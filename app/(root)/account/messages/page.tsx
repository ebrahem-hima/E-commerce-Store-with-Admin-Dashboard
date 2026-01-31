"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LuMail, LuMailOpen, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: string;
  subject: string;
  text: string;
  date: Date;
  isRead: boolean;
  type: string;
}

const allMessages: Message[] = [
  {
    id: 1,
    sender: "Admin Support",
    subject: "Refund Approved for Order #5521",
    text: "Hello, We have processed your refund request for Order #5521. The amount of $150 has been returned to your wallet. It may take 3-5 business days to appear in your bank account depending on your bank's policy. If you have any further questions regarding this transaction, please do not hesitate to contact our support team again. Thank you for shopping with us.Hello, We have processed your refund request for Order #5521. The amount of $150 has been returned to your wallet. It may take 3-5 business days to appear in your bank account depending on your bank's policy. If you have any further questions regarding this transaction, please do not hesitate to contact our support team again. Thank you for shopping with us.Hello, We have processed your refund request for Order #5521. The amount of $150 has been returned to your wallet. It may take 3-5 business days to appear in your bank account depending on your bank's policy. If you have any further questions regarding this transaction, please do not hesitate to contact our support team again. Thank you for shopping with us.",
    date: new Date(),
    isRead: false,
    type: "Support",
  },
  {
    id: 2,
    sender: "System Notification",
    subject: "Welcome to Exclusive Store! 🎉",
    text: "Thank you for creating an account with us. We are thrilled to have you! As a welcome gift, use code WELCOME10 for 10% off your first purchase.",
    date: new Date(Date.now() - 3600 * 1000),
    isRead: false,
    type: "System",
  },
  {
    id: 3,
    sender: "Admin",
    subject: "Update regarding your shipping address",
    text: "We noticed an issue with the shipping address provided for your latest order. Please update it within 24 hours to ensure timely delivery.",
    date: new Date(Date.now() - 86400 * 1000 * 2),
    isRead: true,
    type: "Alert",
  },
];

const MessageItem = ({ msg, onRead }: { msg: Message; onRead: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = msg.text.length > 120;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded && !msg.isRead) {
      onRead();
    }
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    if (!msg.isRead) {
      onRead();
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        "transition-all duration-300 hover:shadow-md border-l-4 cursor-pointer",
        !msg.isRead
          ? "border-l-primary bg-primary/5"
          : "border-l-transparent bg-white",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "mt-1",
                !msg.isRead ? "text-primary" : "text-gray-400",
              )}
            >
              {!msg.isRead ? <LuMail size={20} /> : <LuMailOpen size={20} />}
            </div>

            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold flex items-center flex-wrap gap-2">
                {msg.subject}
                {!msg.isRead && (
                  <Badge className="bg-primary hover:bg-primary text-white text-[10px] h-5 px-1.5 rounded-full">
                    New
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="capitalize text-xs font-normal"
                >
                  {msg.type}
                </Badge>
              </CardTitle>

              <span className="text-xs text-muted-foreground font-medium mt-1">
                From: {msg.sender} • {msg.date.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative pl-8">
          {" "}
          <p
            className={cn(
              "text-sm text-gray-700 leading-relaxed whitespace-pre-wrap transition-all duration-300",
              !isExpanded && isLongText && "line-clamp-2",
            )}
          >
            {msg.text}
          </p>
          {isLongText && (
            <Button
              variant="link"
              size="sm"
              onClick={handleToggle}
              className="p-0 h-auto mt-2 text-primary font-medium flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Show Less <LuChevronUp size={14} />
                </>
              ) : (
                <>
                  Read More <LuChevronDown size={14} />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>(allMessages);

  const handleMarkAsRead = async (ID: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === ID ? { ...message, isRead: true } : message,
      ),
    );
  };
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View updates and communications from the admin team.
          </p>
        </div>
        <Badge variant="outline" className="text-sm py-1 px-3 bg-white">
          Total: {allMessages.length}
        </Badge>
      </div>

      <div className="grid gap-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem
              key={msg.id}
              onRead={() => handleMarkAsRead(msg.id)}
              msg={msg}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
            <LuMailOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              No messages yet
            </h3>
            <p className="text-sm text-gray-500">
              Updates from the admin will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
