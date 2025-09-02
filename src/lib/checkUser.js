import { currentUser } from "@clerk/nextjs/server";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    // Only return plain data
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses?.[0]?.emailAddress,
      imageUrl: user.imageUrl,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};  
