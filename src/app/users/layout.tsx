import Header from "@/app/users/layout/header";
import Footer from "@/app/users/layout/footer";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
        <main className="p-6">{children}</main>
      <Footer />
    </div>
  );
}
