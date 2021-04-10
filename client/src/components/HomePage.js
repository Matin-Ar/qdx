import React from "react";
import FavCategory from "./FavCategory";
import Hero from "./Hero";
import NewCoursesList from "./NewCoursesList";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FavCategory />
      <NewCoursesList />
    </div>
  );
}
