import Navbar from "./components/layout/navbar.jsx"
import HomePage from "./components/home/hero.jsx"
import AboutDoctor from "./components/home/aboutDoctor.jsx"
import WhyChooseUs from "./components/home/whyChooseUs"
import Services from "./components/home/services.jsx"
import Videos from "./components/home/videos.jsx"
import WhyChooseUs2 from "./components/home/whyChooseUs2"
import Gallery from "./components/home/gallery.jsx"
import Transformation from "./components/home/transformation.jsx"
import Reviews from "./components/home/reviews.jsx"
import BookAppointment from "./components/home/bookAppointment.jsx"
import Footer from "./components/layout/footer";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <AboutDoctor />
      <WhyChooseUs />
      <Services />
      <Videos />
      <WhyChooseUs2 />
      <Gallery />
      <Transformation />
      <Reviews />
      <BookAppointment />
      <Footer />
    </>
  );
}

export default App;