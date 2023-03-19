import Link from 'next/link'

export default function Header() {
  return (
    <header className="container mx-auto my-6">
      <nav>
        {/* <img src="" alt="Logo" /> */}
        <Link href="/" className="border border-white-1 text-lg p-2 mr-3">Home</Link>
        <Link href="/events" className="border border-white-1 text-lg p-2 mr-3">Events</Link>
        <Link href="/about" className="border border-white-1 text-lg p-2 mr-3">About</Link>
      </nav>
    </header>
  )
}
