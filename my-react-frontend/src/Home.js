import React from "react";
import Header from "./components/Header/Header";
import Slidetop from "./components/Slidetop/Slidetop";
import Footer from "./components/Footer/Foter";
import CourseList from "./components/Page/course/CourseList";

function Home() {
  return (
    <div>
      <Header />
      <Slidetop />
      <CourseList />
      <Footer />
    </div>
  );
}

export default Home;
