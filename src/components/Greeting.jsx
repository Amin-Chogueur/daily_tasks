import { useSession } from "next-auth/react";
function Greeting() {
  const { data: session } = useSession();
  let username = session?.user.name;
  username = username?.charAt(0).toUpperCase() + username?.slice(1);
  return (
    <div className="text-center flex-1">
      <h2 className="text-xl text-center text-[#ebedf1] ">
        {session ? `Welcome ${username}` : "Welcome To Our App"}
      </h2>
    </div>
  );
}

export default Greeting;
