import HomePage from "@/app/users/home/index";
import Header from "@/app/users/layout/header";
import Footer from "@/app/users/layout/footer";

export default function MainPage() {
    return (
        <div>
            <Header />
                <main className="p-6"><HomePage /></main>
            <Footer />
        </div>
    );
}
