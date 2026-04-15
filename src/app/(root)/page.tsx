import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

/*
 *   Copyright (c) 2026 Massimiliano Porzio
 *   All rights reserved.
 */
const Home = async () => {
  const session = await auth();
  console.log("Session:", session);
  return (
    <div>
      {" "}
      <h1 className="h1-bold">Welcome to the ultimate next.js course! 👏</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button className="rounded-2" type="submit">
          Log out
        </Button>
      </form>
    </div>
  );
};

export default Home;
