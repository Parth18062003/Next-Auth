import { auth, signOut } from "@/auth";
import { Hero } from "@/components/Hero";

const Home = async () => {
  const session = await auth();
  let href = "/auth/login";
  if (session) {
    href = "/started";
  }
  return (
    <>
      <Hero href={href} />
    </>
  );
};

export default Home;
