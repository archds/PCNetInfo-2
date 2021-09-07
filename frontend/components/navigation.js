import Link from "next/link";

export default function Navigation() {
    return (
        <header>
            <div className={'nav'}>
                <Link href={'/'}>
                    <a>Computers</a>
                </Link>
                <Link href={'/monitors'}>
                    <a>Monitors</a>
                </Link>
            </div>
            <style jsx>{`
              .nav {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 20px;
                width: 70%;
                padding-bottom: 20px;
              }

              a {
                font-weight: bold;
              }
            `}</style>
        </header>
    )
}