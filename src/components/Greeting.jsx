"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
function Greeting() {
  const { data: session } = useSession();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (session?.user?.name) {
      let username = session.user.name;
      username = username.charAt(0).toUpperCase() + username.slice(1);
      setName(username);
    }
  }, [session]);

  return (
    <div className="text-center flex-1">
      <h2 className="text-xl text-center text-[#ebedf1] ">
        {session ? `Welcome ${name}` : "Welcome To Our App"}
      </h2>
    </div>
  );
}

export default Greeting;
