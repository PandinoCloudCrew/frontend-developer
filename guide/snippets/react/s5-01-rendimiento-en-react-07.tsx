function Hero() {
  return (
    <>
      {/* LCP image — load immediately */}
      <img src="/images/hero.jpg" alt="Hero banner" width={1200} height={600} fetchPriority="high" />

      {/* Below the fold — lazy load */}
      <img src="/images/product.jpg" alt="Product" width={400} height={300} loading="lazy" />
    </>
  );
}
