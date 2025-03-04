import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <span className="font-logo text-white text-3xl font-bold tracking-[4px]">
          Dmitriy
        </span>
        <span className="inline-flex bg-primaryGreen w-2 h-2 rounded-full"></span>
      </Link>
    </div>
  );
};

export default Logo;
