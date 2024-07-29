'use client'
import HeaderComponent from "@/components/headerComponent";
import FooterComponent from "@/components/footerComponent";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import "./globals.css";

const ResearchPageContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");
  const sessionImage = searchParams.get("image");

  return (
    <>
      <div className="wrapper">
        <HeaderComponent flag={true} sessionImage={sessionImage} />
        <div className="cards">
          <ul>
            {Array.from({ length: 17 }, (_, i) => i + 1).map((sdg) => (
              // Here first we create an array of length 17 from 1 to 17 and use the map function to access the elements i.e.(numbers from 1 to 17) as "sdg"
              <li key={sdg}>
                <a href={`/${category}?SDG=${sdg}`} style={{ textDecoration: "none" }}>
                  <h1>SDG {sdg}</h1>
                  <p>
                    {[
                      "NO POVERTY",
                      "ZERO HUNGER",
                      "GOOD HEALTH AND WELL-BEING",
                      "QUALITY EDUCATION",
                      "GENDER EQUALITY",
                      "CLEAN WATER AND SANITATION",
                      "AFFORDABLE AND CLEAN ENERGY",
                      "DECENT WORK AND ECONOMIC GROWTH",
                      "INDUSTRY, INNOVATION AND INFRASTRUCTURE",
                      "REDUCED INEQUALITIES",
                      "SUSTAINABLE CITIES AND COMMUNITIES",
                      "RESPONSIBLE CONSUMPTION AND PRODUCTION",
                      "CLIMATE ACTION",
                      "LIFE BELOW WATER",
                      "LIFE ON LAND",
                      "PEACE, JUSTICE AND STRONG INSTITUTIONS",
                      "PARTNERSHIPS FOR THE GOALS"
                    ][sdg - 1]}
                    {/*Here we create an array with all the headings and access the array elements using array indexing based on the current number i.e. sdg defined in the map function */}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

const ResearchPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResearchPageContent />
  </Suspense>
);

export default ResearchPage;
