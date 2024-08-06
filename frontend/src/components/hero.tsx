function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <img src="/images/belvedere1.jpg" alt="Belvedere 1" />
        <img src="/images/belvedere2.jpg" alt="Belvedere 2" />
        <img src="/images/belvedere3.jpg" alt="Belvedere 3" />
        <img src="/images/belvedere4.jpg" alt="Belvedere 4" />
        <img src="/images/belvedere5.jpg" alt="Belvedere 5" />
      </div>
      <div className="hero-content">
        <h1 className="text-5xl font-bold py-8">Welcome to Our Wedding</h1>
        <p className="mt-4 text-xl">
          We are so excited to celebrate with you on the {"<date>"} at the{" "}
          {"<venue>"}!
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
