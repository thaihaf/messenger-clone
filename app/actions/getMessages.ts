import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMessages = async (conversationId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
