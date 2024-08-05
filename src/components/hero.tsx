function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <img src="/images/bma1.jpg" alt="Baltimore Museum of Art 1" />
        <img src="/images/bma2.jpg" alt="Baltimore Museum of Art 2" />
        <img src="/images/bma3.avif" alt="Baltimore Museum of Art 3" />
      </div>
      <div className="hero-content">
        <h1 className="text-5xl font-bold">Welcome to Our Wedding</h1>
        <p className="mt-4 text-xl">We are so excited to celebrate with you!</p>
      </div>
    </section>
  );
}

export default HeroSection;
