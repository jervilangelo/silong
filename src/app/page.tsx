import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { City } from "@/components/city";
import { Brand } from "@/components/brand";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <City />
        <div className="hero-copy">
          <h1>
            Find your pause
            <br />
            in writing.
          </h1>
          <p>
            In a world that never slows down, a quiet refuge for stories,
            poetry, and everything left unsaid.
          </p>
          <div className="actions">
            <Link className="button" href="/signup">
              Start writing <ArrowUpRight size={18} />
            </Link>
            <Link href="/explore">Explore stories ↗</Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>A Filipino literary refuge</span>
          <Brand />
          <span>Stay a little. Read a little.</span>
        </div>
      </section>
      <section className="intro section">
        <h2>
          Some words
          <br />
          need a home.
        </h2>
        <div>
          <p className="statement">
            The poem in your notes. The memory you keep returning to. The
            thought that arrives with the rain.
          </p>
          <p>
            Silong is a place to set them down. An English-first home for
            Filipino voices and anyone who finds a little shelter in words.
          </p>
          <Link href="/about">A little more about Silong ↗</Link>
        </div>
      </section>
      <section className="discovery section">
        <div className="section-heading">
          <h2>A little reading room.</h2>
          <p>Original sample writing · A preview of what’s to come</p>
        </div>
        <div className="reading-grid">
          <article className="sample featured">
            <span>Poetry · Sample</span>
            <h3>When the city exhales</h3>
            <p className="poem">
              The last jeepney turns the corner.
              <br />
              Rain gathers in the hollow of a leaf.
              <br />
              For once, the city asks nothing of us.
              <br />
              For once, we listen.
            </p>
            <p>Silong editorial sample · 1 min read</p>
          </article>
          <div>
            <article className="sample">
              <span>Reflection · Sample</span>
              <h3>
                The things we leave
                <br />
                by the window
              </h3>
              <p>
                Some evenings, home is less a place than a small permission to
                begin again.
              </p>
              <p>Silong editorial sample · 1 min read</p>
            </article>
            <article className="sample">
              <span>Personal essay · Sample</span>
              <h3>A language for coming home</h3>
              <p>
                Between the words we inherited and the words we choose, there is
                room for a story.
              </p>
              <p>Silong editorial sample · 1 min read</p>
            </article>
          </div>
        </div>
        <Link href="/explore">Visit the reading room ↗</Link>
      </section>
      <section className="atmosphere">
        <City />
        <div>
          <h2>A room for words.</h2>
          <p>
            Writing comes first. The atmosphere simply makes room for it.
            Customizable rainy environments and ambient sound are planned for a
            future chapter.
          </p>
          <Link className="button" href="/signup">
            Make yourself at home ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
