import React from "react";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing2 from "./PageAddListing2";
import PageAddListing3 from "./PageAddListing3";
import PageAddListing4 from "./PageAddListing4";
import PageAddListing5 from "./PageAddListing5";
import PageAddListing6 from "./PageAddListing6";
import PageAddListing7 from "./PageAddListing7";
import PageAddListing8 from "./PageAddListing8";

interface PageProps {
  params: { stepIndex: number };
  searchParams?: Record<string, string | string[] | undefined>;
}

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const stepIndex = Number(params.stepIndex);

  // Map step indexes to components
  const contentComponents: Record<number, React.FC<any>> = {
    1: PageAddListing1,
    2: PageAddListing2,
    3: PageAddListing3,
    4: PageAddListing4,
    5: PageAddListing5,
    6: PageAddListing6,
    7: PageAddListing7,
    8: PageAddListing8,
  };

  // Default to PageAddListing1 if stepIndex is not valid
  const ContentComponent = contentComponents[stepIndex] || PageAddListing1;

  return <ContentComponent />;
};

export default Page;
