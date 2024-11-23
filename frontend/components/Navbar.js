import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Search Flights</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
      <Link href="/favorites">Favorites</Link>
      <Link href="/mypage">My Page</Link>
    </nav>
  );
}
