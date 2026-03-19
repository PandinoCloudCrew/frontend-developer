import Image from 'next/image';

function Hero() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero banner"
      width={1200}
      height={600}
      priority
    />
  );
}
