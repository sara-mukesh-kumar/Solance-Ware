import { useUser } from "@clerk/nextjs";

export default function HeaderWrapper() {
  const { isSignedIn, user } = useUser();

  return (
    <header>
      {isSignedIn ? (
        <p className="text-2xl md:text-4xl font-bold mb-4">Hello, {user.firstName ? user.firstName : user.username}</p>
      ) : (
        <p className="text-2xl md:text-4xl font-bold mb-4">Not signed in</p>
      )}
    </header>
  );
}