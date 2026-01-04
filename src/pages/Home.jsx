import Hero from '../components/home/Hero';
import BestWorkers from '../components/home/BestWorkers';
import Testimonial from '../components/home/Testimonial';
import HowItWorks from '../components/home/HowItWorks';
import FAQ from '../components/home/FAQ';
import Stats from '../components/home/Stats';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <Stats />
            <HowItWorks />
            <BestWorkers />
            <Testimonial />
            <FAQ />
            <CTA />
        </div>
    );
};

export default Home;

