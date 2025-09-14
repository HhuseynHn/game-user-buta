import ForgotPassword from "@/components/auth/forgot-password";
import Login from "@/components/auth/login";
import OtpVerification from "@/components/auth/otp";
import Register from "@/components/auth/register";
import ResetPassword from "@/components/auth/reset-password";
import CategoryPopular from "@/components/category/category-popular";
import CategorySuper from "@/components/category/category-super";
import HeroSection from "@/components/layout/hero-section";
import ProductBest from "@/components/product/product-best";
import ProductDetail from "@/components/product/product-detail";
import ProductFilter from "@/components/product/product-filter";
import ProductLateSet from "@/components/product/product-lateset";
import ProductRecommended from "@/components/product/product-recommended";

export default function Home() {
  return (
   <>
   <main className="flex justify-center">
    <div className="w-[90%]">
   <section >
      <HeroSection/>
      {/* <ProductBest/> */}
      {/* <ProductFilter/> */}
    </section>
    <section>
      <CategorySuper/>
    </section>
    <section>
      <CategoryPopular/>
    </section>

    <section>
       <ProductLateSet/>
    </section>

    <section >
      <ProductBest/>
    </section>
    </div>
 
   </main>
   </>
  );
}