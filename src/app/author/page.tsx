"use client";

import { Tab } from "@headlessui/react";
import CarCard from "@/components/CarCard";
import CommentListing from "@/components/CommentListing";
import ExperiencesCard from "@/components/ExperiencesCard";
import StartRating from "@/components/StartRating";
import StayCard from "@/components/StayCard2";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "@/data/listings";
import React, { FC, Fragment, useState } from "react";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
  let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

   

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        
      </div>
    );
  };

   
  return (
    <div className={`nc-AuthorPage `}>
      
    </div>
  );
};

export default AuthorPage;
