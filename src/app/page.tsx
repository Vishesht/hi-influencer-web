import * as React from "react";
import Header from "@/components/header";
import InfluencerList from "@/components/influencerList";
import CategoryList from "@/components/categoryList";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <InfluencerList header="Featured" />
      <InfluencerList header="Instagram" />
      <InfluencerList header="Youtube" />
      <CategoryList header="Categories" />
      <Footer />
    </div>
  );
}
