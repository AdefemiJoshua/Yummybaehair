import { useEffect, useState } from 'react';

const BASE_PATH = import.meta.env.BASE_URL;
const appHref = (path) => path.startsWith('#') || /^(https?:|mailto:|tel:)/.test(path)
  ? path
  : `${BASE_PATH}${path.replace(/^\/+/, '')}`;
const assetHref = (path) => /^(https?:|data:|blob:)/.test(path)
  ? path
  : `${BASE_PATH}${path.replace(/^\/+/, '')}`;
function currentRoute() {
  const baseRoot = BASE_PATH === '/' ? '' : BASE_PATH.replace(/\/$/, '');
  const pathname = window.location.pathname;
  const appPath = baseRoot && (pathname === baseRoot || pathname.startsWith(`${baseRoot}/`))
    ? pathname.slice(baseRoot.length) || '/'
    : pathname;
  return appPath.replace(/\/$/, '') || '/';
}

function Icon({ name, size = 16, className = '' }) {
  const paths = {
    'arrow-up-right': <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    'arrow-right': <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>,
    'arrow-left': <><path d="M20 12H5" /><path d="m11 6-6 6 6 6" /></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    smile: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.4 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></>,
    refresh: <><path d="M20 7v5h-5" /><path d="M20 12a8 8 0 0 0-14.8-4M4 17v-5h5" /><path d="M4 12a8 8 0 0 0 14.8 4" /></>,
    truck: <><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
    star: <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z" />,
  };
  return <svg className={`icon icon-${name}${className ? ` ${className}` : ''}`} width={size} height={size} viewBox="0 0 24 24" fill={name === 'star' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={name === 'truck' ? 1.6 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

const WHATSAPP_NUMBER = '2348168162899';
const whatsapp = (message) => {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
};

const categories = [
  {
    name: 'Straight styles',
    slug: 'straight',
    image: '/images/products/honey-blonde-straight.webp',
    alt: 'Long honey blonde straight wig displayed on a mannequin',
    gallery: [],
    tone: 'rose',
  },
  {
    name: 'Wavy styles',
    slug: 'wavy',
    image: '/images/products/blonde-wave.webp',
    alt: 'Long blonde body wave wig displayed on a mannequin',
    gallery: [
      { image: '/images/products/bronde-wave.webp', alt: 'Layered brown and blonde waves displayed on a mannequin' },
      { image: '/images/products/dark-layered-bob-alt.webp', alt: 'Dark layered bob wig displayed on a mannequin' },
    ],
    tone: 'dark',
  },
  {
    name: 'Curls & coils',
    slug: 'curly',
    image: '/images/products/afro-curl.webp',
    alt: 'Full natural afro curl wig displayed on a mannequin',
    gallery: [
      { image: '/images/products/long-kinky-curl.webp', alt: 'Long kinky curl wig displayed on a mannequin' },
    ],
    tone: 'light',
  },
  {
    name: 'Hair bundles',
    slug: 'bundles',
    image: '/images/products/body-wave-bundle.webp',
    alt: 'Dark body wave hair bundle displayed on its own',
    gallery: [],
    tone: 'light',
  },
];

const products = [
  {
    slug: 'long-kinky-curl-wig',
    name: 'Long Kinky Curl Wig',
    price: '₦280,000',
    category: 'curly',
    texture: 'Long, defined curls',
    image: '/images/products/long-kinky-curl.webp',
    alt: 'Long dark kinky curl wig displayed on a mannequin',
  },
  {
    slug: 'honey-blonde-straight-wig',
    name: 'Honey Blonde Straight Wig',
    price: '₦340,000',
    category: 'straight',
    texture: 'Long and straight',
    image: '/images/products/honey-blonde-straight.webp',
    alt: 'Long honey blonde straight wig displayed on a mannequin',
  },
  {
    slug: 'blonde-wave-wig',
    name: 'Blonde Wave Wig',
    price: '₦320,000',
    category: 'wavy',
    texture: 'Soft body wave',
    image: '/images/products/blonde-wave.webp',
    alt: 'Long blonde body wave wig displayed on a mannequin',
  },
  {
    slug: 'body-wave-bundle',
    name: 'Body Wave Bundle',
    price: '₦95,000',
    category: 'bundles',
    texture: 'Loose body wave',
    image: '/images/products/body-wave-bundle.webp',
    alt: 'Dark body wave hair bundle displayed on its own',
  },
  {
    slug: 'natural-afro-curl-wig',
    name: 'Natural Afro Curl Wig',
    price: '₦280,000',
    category: 'curly',
    texture: 'Full afro curls',
    image: '/images/products/afro-curl.webp',
    alt: 'Full natural afro curl wig displayed on a mannequin',
  },
  {
    slug: 'burgundy-wave-wig',
    name: 'Burgundy Wave Wig',
    price: '₦330,000',
    category: 'wavy',
    texture: 'Long burgundy waves',
    image: '/images/products/burgundy-wave.webp',
    alt: 'Long burgundy wave wig displayed on a mannequin',
  },
  {
    slug: 'bronde-wave-wig',
    name: 'Bronde Wave Wig',
    price: '₦330,000',
    category: 'wavy',
    texture: 'Layered brown and blonde waves',
    image: '/images/products/bronde-wave.webp',
    alt: 'Layered brown and blonde wave wig displayed on a mannequin',
  },
  {
    slug: 'blonde-bob-wig',
    name: 'Blonde Bob Wig',
    price: '₦290,000',
    category: 'wavy',
    texture: 'Short, layered waves',
    image: '/images/products/blonde-bob.webp',
    alt: 'Short blonde layered bob wig displayed on a mannequin',
  },
  {
    slug: 'dark-layered-bob-wig',
    name: 'Dark Layered Bob Wig',
    price: '₦280,000',
    category: 'wavy',
    texture: 'Short layered waves',
    image: '/images/products/dark-layered-bob.webp',
    alt: 'Dark layered bob wig displayed on a mannequin',
  },
  {
    slug: 'honey-highlight-wave-wig',
    name: 'Honey Highlight Wave Wig',
    price: '₦350,000',
    category: 'wavy',
    texture: 'Honey blonde highlighted waves',
    image: '/images/products/honey-highlight-wave.webp',
    alt: 'Honey blonde highlighted wave wig displayed on a mannequin',
  },
  {
    slug: 'long-highlight-wave-wig',
    name: 'Long Highlight Wave Wig',
    price: '₦370,000',
    category: 'wavy',
    texture: 'Long highlighted waves',
    image: '/images/products/long-highlight-wave.webp',
    alt: 'Long highlighted wave wig displayed on a mannequin',
  },
];

const marqueeItems = [
  'Premium quality natural hair',
  'The most luxurious hair experience',
  'Order straight on WhatsApp',
  'Unprocessed. Unmatched.',
];

const photoTones = {
  'afro-curl.webp': 'earth',
  'blonde-bob.webp': 'blush',
  'blonde-wave.webp': 'champagne',
  'body-wave-bundle.webp': 'stone',
  'bronde-wave.webp': 'sage',
  'burgundy-wave.webp': 'berry',
  'dark-layered-bob-alt.webp': 'blush',
  'dark-layered-bob.webp': 'blush',
  'honey-blonde-straight.webp': 'rose',
  'honey-highlight-wave.webp': 'rose',
  'long-highlight-wave.webp': 'rose',
  'long-kinky-curl.webp': 'earth',
  'styling-reference.webp': 'blush',
};

function Photo({ src, alt, className = '', position = 'center 30%', fit = 'contain', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  const filename = src.split(/[?#]/, 1)[0].split('/').pop();
  const tone = photoTones[filename] || 'neutral';
  return (
    <div className={`photo photo-tone-${tone} ${className}${failed ? ' photo-failed' : ''}`}>
      {failed ? <div className="photo-fallback" role="img" aria-label={alt}>
        <svg viewBox="0 0 200 260" aria-hidden="true">
          <path d="M100 8C45 8 22 55 30 120c4 40-6 90-14 132h168c-8-42-18-92-14-132C178 55 155 8 100 8Z" fill="currentColor" />
          <ellipse cx="100" cy="118" rx="42" ry="54" fill="#b98572" />
          <path d="M58 100c10-40 74-56 84 0-20-22-62-22-84 0Z" fill="currentColor" />
          <path d="M60 205c10 24 70 24 80 0l30 55H30Z" fill="#b98572" />
        </svg>
      </div> : <img src={assetHref(src)} alt={alt} style={{ objectPosition: position, objectFit: fit }} loading={loading} onError={() => setFailed(true)} />}
    </div>
  );
}

function Logo({ footer = false }) {
  return <a href={appHref('/')} className={`logo${footer ? ' logo-footer' : ''}`} aria-label="Yummybaehair home">
    <img src={assetHref('/images/yummybaehair-logo.png')} alt="" width="1019" height="397" />
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = currentRoute();
  const links = [
    ['Shop', '/shop'],
    ['Collection', '/collection'],
    ['Hair Care', '/hair-care'],
    ['Reviews', '/reviews'],
    ['Contact', '/contact'],
  ];

  return <>
    <div className="offer-bar">A little welcome gift: enjoy 10% off your first purchase</div>
    <header className="site-header">
      <div className="header-wrap">
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          <span /><span />
        </button>
        <Logo />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map(([label, path]) => <a href={appHref(path)} key={label} aria-current={currentPath === path ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="button button-order" href={whatsapp("Hi Yummybaehair, I'd like to place an order")}>Order <Icon name="arrow-up-right" /></a>
      </div>
    </header>
  </>;
}

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return <div className="marquee" aria-label={marqueeItems.join('. ')}>
    <div className="marquee-track" aria-hidden="true">
      {items.map((item, index) => <span key={`${item}-${index}`}>{item}<b><Icon name="sparkle" size={13} /></b></span>)}
    </div>
  </div>;
}

function Hero() {
  return <section className="hero" id="top">
    <div className="wrap hero-wrap">
      <div className="hero-copy">
        <span className="eyebrow">Discover your perfect look</span>
        <h1>Enhance your natural beauty with our <em>exquisite wigs.</em></h1>
        <p>Made to feel soft, look natural, and help you show up as your most confident self.</p>
        <a className="button button-fill" href="#collection">Shop now <Icon name="arrow-up-right" /></a>
      </div>
      <Photo className="hero-photo" src="/images/products/blonde-wave.webp" alt="Long blonde body wave wig displayed on a mannequin" loading="eager" />
      <span className="hero-note">GOOD HAIR. GOOD ENERGY.</span>
    </div>
  </section>;
}

function Collection() {
  return <section className="section collection" id="collection">
    <div className="wrap">
      <div className="section-intro">
        <span className="eyebrow">Made for every version of you</span>
        <h2 className="section-title">Shop the <em>collection</em></h2>
        <p>Find your new everyday favourite, your big-moment look, and everything in between.</p>
      </div>
      <div className="tiles">
        {categories.map((category, index) => <a className={`tile tile-${category.tone}`} href={appHref(`/shop?category=${category.slug}`)} key={category.name}>
          <Photo src={category.image} alt={category.alt} position={category.position} className={`tile-photo tile-photo-${index + 1}`} />
          <div className="tile-gallery" aria-hidden="true">
            {category.gallery.map((photo) => <Photo key={photo.image} src={photo.image} alt={photo.alt} className="tile-gallery-photo" />)}
          </div>
          <div className="tile-copy"><span>01 / 0{index + 1}</span><h3>{category.name}</h3><b>Explore <Icon name="arrow-up-right" size={14} /></b></div>
        </a>)}
      </div>
      <div className="features">
        {[
          ['check', 'Original product', 'Premium quality, carefully selected.'],
          ['smile', 'Satisfaction assured', 'Made for comfort, quality, and confidence.'],
          ['refresh', 'Fresh arrivals', 'New styles for your next favourite look.'],
          ['truck', 'Reliable delivery', 'Thoughtfully packed and sent to your door.'],
        ].map(([icon, title, description]) => <article className="feature" key={title}>
          <span className="feature-icon"><Icon name={icon} size={18} /></span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function HairCare() {
  return <section className="care split" id="care">
    <Photo src="/images/products/long-kinky-curl.webp" alt="Long curly wig displayed on a mannequin" className="care-photo" />
    <div className="care-copy">
      <span className="eyebrow">Keep your crown feeling its best</span>
      <h2>Hair care, with a little <em>extra love.</em></h2>
      <p>From washing and conditioning to storage, our care range helps your wig stay soft, shiny, and tangle-free for longer.</p>
      <a className="button button-fill" href={whatsapp("Hi Yummybaehair, I'd like to see your hair care products")}>Explore hair care <Icon name="arrow-up-right" /></a>
    </div>
  </section>;
}

function ProductCard({ product, index }) {
  const orderMessage = `Hi Yummybaehair, I'd like to order the ${product.name}. I saw the sample price is ${product.price}; please confirm the current price, available options, and availability.`;

  return <article className="product-card">
    <a className="product-photo-link" href={appHref(`/products/${product.slug}`)} aria-label={`View ${product.name} details`}>
      <Photo src={product.image} alt={product.alt} className={`product-photo product-photo-${index + 1}`} />
      <span className="product-order">View details <Icon name="arrow-up-right" size={14} /></span>
    </a>
    <div className="product-meta"><h3>{product.name}</h3><span>{product.price}</span></div>
    <a className="product-cta" href={whatsapp(orderMessage)}>Order on WhatsApp <Icon name="arrow-up-right" /></a>
  </article>;
}

function ProductGrid({ items }) {
  return <div className="product-grid">{items.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>;
}

function BestSellers({ eyebrow = 'A few baes’ favourites', title = <>Best <em>sellers</em></> }) {
  return <section className="section best-sellers" id="best-sellers">
    <div className="wrap">
      <div className="section-intro section-intro-centered">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <p className="price-preview-note">Sample prices for preview only. Confirm the current price, options, and availability on WhatsApp.</p>
      <ProductGrid items={products.slice(0, 6)} />
      <div className="center-action"><a className="button button-outline" href={appHref('/shop')}>Explore the full collection <Icon name="arrow-up-right" /></a></div>
    </div>
  </section>;
}

function ProductCatalog() {
  const [query, setQuery] = useState('');
  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  const activeCategory = categories.find((category) => category.slug === requestedCategory);
  const matching = products.filter((product) => {
    const matchesCategory = !activeCategory || product.category === activeCategory.slug;
    const matchesQuery = `${product.name} ${product.texture}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return <section className="section catalog-section" id="best-sellers">
    <div className="wrap">
      <div className="section-intro section-intro-centered">
        <span className="eyebrow">Choose the one that feels like you</span>
        <h2 className="section-title">{activeCategory ? <>{activeCategory.name} <em>collection</em></> : <>Shop <em>all styles</em></>}</h2>
      </div>
      <div className="catalog-controls">
        <label className="catalog-search"><span className="sr-only">Search products</span><Icon name="search" size={20} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search styles" /></label>
      </div>
      <nav className="catalog-categories" aria-label="Filter products by category">
        <a className={!activeCategory ? 'is-active' : ''} href={appHref('/shop')} aria-current={!activeCategory ? 'page' : undefined}>All styles</a>
        {categories.map((category) => <a className={activeCategory?.slug === category.slug ? 'is-active' : ''} href={appHref(`/shop?category=${category.slug}`)} aria-current={activeCategory?.slug === category.slug ? 'page' : undefined} key={category.slug}>{category.name}</a>)}
      </nav>
      <p className="price-preview-note">Sample prices for preview only. Confirm the current price, options, and availability on WhatsApp.</p>
      <p className="catalog-count" aria-live="polite">{matching.length} {matching.length === 1 ? 'style' : 'styles'}</p>
      {matching.length ? <ProductGrid items={matching} /> : <div className="catalog-empty"><p>No styles match “{query}”.</p><button className="text-button" onClick={() => setQuery('')}>Clear search</button></div>}
    </div>
  </section>;
}

function PureHair() {
  return <section className="pure-hair">
    <div className="pure-inner">
      <span className="eyebrow">Feel the difference</span>
      <h2>PURE HAIR</h2>
      <p>Soft, natural, and made to be worn your way.</p>
      <a className="button button-fill" href="#best-sellers">Find your look <Icon name="arrow-up-right" /></a>
      <span className="pure-mark" aria-hidden="true">YB</span>
    </div>
  </section>;
}

function Reviews() {
  const reviews = [
    {
      name: 'Kia',
      quote: "I've bought wigs from many places, but this was the best. The hair was soft, full, and exactly as shown. I'm already planning my next order.",
    },
    {
      name: 'Gloria',
      quote: 'Delivery was quick and the packaging was neat. The wig sits so naturally and I get compliments every time I wear it.',
    },
  ];
  return <section className="section reviews" id="reviews">
    <div className="wrap">
      <div className="section-intro section-intro-centered">
        <span className="eyebrow">Kind words from the community</span>
        <h2 className="section-title">Don’t just take <em>our word.</em></h2>
      </div>
      <div className="review-grid">
        {reviews.map((review) => <article className="review" key={review.name}>
          <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
          <div className="review-copy"><span className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Icon key={index} name="star" size={12} />)}</span><p>“{review.quote}”</p><b>{review.name}</b><span className="review-customer">Yummybaehair customer</span></div>
        </article>)}
      </div>
    </div>
  </section>;
}

function Booking() {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const message = `Hi Yummybaehair, I'd like to book a consultation. Name: ${values.name}, Service: ${values.service}, Phone: ${values.phone}, Date: ${values.date}`;
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return <section className="booking" id="book">
    <Photo src="/images/products/blonde-bob.webp" alt="Blonde layered bob wig displayed on a mannequin" className="booking-photo" />
    <div className="booking-panel">
      {sent ? <div className="booking-success" role="status"><span><Icon name="sparkle" size={25} /></span><h2>Thank you, <em>bae.</em></h2><p>Your WhatsApp message is ready. Our team will help you find your perfect look.</p></div> : <form className="booking-form" onSubmit={submit}>
        <span className="eyebrow">A little one-on-one care</span>
        <h2>Book a <em>consultation</em></h2>
        <p>Tell us what you’re looking for and we’ll help you make it yours.</p>
        <label htmlFor="booking-name">Your name</label>
        <input id="booking-name" name="name" placeholder="Name" autoComplete="name" required />
        <label htmlFor="booking-service">What can we help with?</label>
        <select id="booking-service" name="service" defaultValue="Wig styling">
          <option>Wig styling</option><option>Wig installation</option><option>Custom wig order</option><option>Hair care advice</option>
        </select>
        <div className="form-row">
          <div><label htmlFor="booking-phone">Phone number</label><input id="booking-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your number" required /></div>
          <div><label htmlFor="booking-date">Preferred date</label><input id="booking-date" name="date" type="date" required /></div>
        </div>
        <button className="button button-fill" type="submit">Continue on WhatsApp <Icon name="arrow-up-right" /></button>
      </form>}
    </div>
  </section>;
}

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return <footer className="site-footer">
    <div className="wrap">
      <div className="footer-columns">
        <div className="footer-about"><Logo footer /><p>Premium wigs, bundles, frontals, and clip-ins. Made for your crown.</p><a href={whatsapp('Hi Yummybaehair, I have a question')}>Chat with us <Icon name="arrow-up-right" size={14} /></a></div>
        <div><h3>Explore</h3><a href={appHref('/shop')}>Shop</a><a href={appHref('/collection')}>Collection</a><a href={appHref('/hair-care')}>Hair care</a><a href={appHref('/reviews')}>Reviews</a></div>
        <div><h3>Need a hand?</h3><a href={appHref('/consultation')}>Book a consultation</a><a href={appHref('/shipping')}>Shipping</a><a href={appHref('/payment')}>Payment</a><a href={appHref('/returns')}>Returns</a><a href={appHref('/faq')}>FAQs</a><a href={appHref('/privacy')}>Privacy policy</a></div>
        <div className="footer-newsletter"><h3>Get the good stuff</h3><p>New looks and a little love in your inbox.</p>
          {subscribed ? <span className="newsletter-success" role="status">This preview doesn’t save emails yet. Message us on WhatsApp for new-drop updates.</span> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email" autoComplete="email" required /><button type="submit" aria-label="Join the newsletter"><Icon name="arrow-right" /></button></form>}
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Yummybaehair. All rights reserved.</span><span>Made with love, for your crown.</span></div>
    </div>
  </footer>;
}

function HomePage() {
  return <main>
    <Hero />
    <Marquee />
    <Collection />
    <HairCare />
    <BestSellers />
    <PureHair />
    <Marquee />
    <Reviews />
    <Booking />
  </main>;
}

function PageIntro({ eyebrow, title, description, backHref = '/', backLabel = 'Home' }) {
  return <section className="page-intro">
    <div className="wrap">
      <a className="page-back" href={appHref(backHref)}><Icon name="arrow-left" size={14} /> Back to {backLabel}</a>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </section>;
}

function ShopPage() {
  return <>
    <PageIntro eyebrow="Find your next favourite" title={<>Shop <em>Yummybaehair</em></>} description="Explore our most-loved styles, chosen to help you feel like yourself—only a little more." />
    <ProductCatalog />
    <Collection />
  </>;
}

function CollectionPage() {
  return <>
    <PageIntro eyebrow="Made for every version of you" title={<>Find your <em>hair</em></>} description="Straight, wavy, curly, and coily styles, plus bundles for the looks you love and the moments you make." />
    <Collection />
    <BestSellers />
  </>;
}

function HairCarePage() {
  return <>
    <PageIntro eyebrow="Keep your crown feeling its best" title={<>A little more <em>hair love</em></>} description="Simple care, thoughtful advice, and products to help your hair stay soft and beautiful for longer." />
    <HairCare />
    <section className="care-notes">
      <div className="wrap care-notes-grid">
        <article><span>01</span><h2>Detangle gently</h2><p>Start at the ends and work upward with a wide-tooth comb. Take your time around knots and delicate lace.</p></article>
        <article><span>02</span><h2>Wash with care</h2><p>Use lukewarm water and a gentle shampoo. Smooth product through the hair instead of rubbing or bunching it.</p></article>
        <article><span>03</span><h2>Condition the lengths</h2><p>Apply conditioner through the mid-lengths and ends, then rinse thoroughly. Follow the care instructions for your specific hair.</p></article>
        <article><span>04</span><h2>Dry before storing</h2><p>Gently blot away excess water, let the hair dry fully, and store it in a clean, protected place between wears.</p></article>
        <article><span>05</span><h2>Ask before heat styling</h2><p>Heat tolerance varies by product. Message us to confirm care and styling guidance for the exact item you choose.</p></article>
        <article className="care-note-cta"><h2>Need product-specific advice?</h2><p>Tell us which style you have and we’ll help you find its care instructions.</p><a className="button button-fill" href={whatsapp('Hi Yummybaehair, please share care instructions for my hair')}>Ask us on WhatsApp <Icon name="arrow-up-right" /></a></article>
      </div>
    </section>
  </>;
}

function ReviewsPage() {
  return <>
    <PageIntro eyebrow="Kind words from the community" title={<>The baes have <em>spoken</em></>} description="A few notes from customers who found a look they love." />
    <Reviews />
    <div className="review-cta"><a className="button button-fill" href={appHref('/shop')}>Find your look <Icon name="arrow-up-right" /></a></div>
  </>;
}

function ContactPage() {
  return <>
    <PageIntro eyebrow="We’re here to help" title={<>Talk to your <em>hair bestie</em></>} description="Ask about a product, get help choosing a look, or book a consultation with Yummybaehair." />
    <section className="contact-options"><div className="wrap contact-options-grid">
      <article><span className="eyebrow">WhatsApp</span><h2>Let’s chat.</h2><p>Message us about products, availability, delivery, or anything you’d like to know before ordering.</p><a className="button button-fill" href={whatsapp('Hi Yummybaehair, I have a question')}>Message +234 816 816 2899 <Icon name="arrow-up-right" /></a></article>
      <article><span className="eyebrow">Personal guidance</span><h2>Book a consultation.</h2><p>Share your preferred style and a few details. We’ll follow up in WhatsApp to confirm next steps.</p><a className="button button-outline" href={appHref('/consultation')}>See consultation details <Icon name="arrow-up-right" /></a></article>
    </div></section>
  </>;
}

function ConsultationPage() {
  return <>
    <PageIntro eyebrow="A little one-on-one care" title={<>Let’s find your <em>perfect look</em></>} description="Book a consultation and tell us what you have in mind. We’ll help you choose a style that feels like you." />
    <section className="consultation-steps"><div className="wrap consultation-steps-grid">
      <article><span>01</span><h2>Tell us what you need</h2><p>Choose a service, share your phone number, and select a preferred date in the form below.</p></article>
      <article><span>02</span><h2>Continue in WhatsApp</h2><p>Your details open as a prepared message to Yummybaehair so you can send your request.</p></article>
      <article><span>03</span><h2>Confirm together</h2><p>Our team can confirm availability, timing, and any costs with you before anything is booked.</p></article>
    </div></section>
    <Booking />
  </>;
}

const customerInfo = {
  '/shipping': {
    eyebrow: 'Customer information',
    title: 'Shipping',
    description: 'We’ll confirm delivery options, timing, and cost for your location before your order is finalized.',
    sections: [
      ['Delivery options', 'Available delivery methods and coverage depend on your destination. Message us with your location and the product you want so we can confirm what is available.'],
      ['Timing and fees', 'We’ll share the current delivery estimate and fee before you pay. Delivery times can vary by destination and order details.'],
      ['Order updates', 'Keep your order conversation in WhatsApp so you can follow up with our team about delivery.'],
    ],
  },
  '/payment': {
    eyebrow: 'Customer information',
    title: 'Payment',
    description: 'Confirm the total and payment details with our team before completing an order.',
    sections: [
      ['Accepted methods', 'Ask us which payment methods are currently available. We’ll confirm the accepted option for your order in WhatsApp.'],
      ['Before you pay', 'Please confirm the product, total, delivery fee, and recipient details with our team before making payment.'],
      ['Payment questions', 'If something about a payment request is unclear, pause and message Yummybaehair using the WhatsApp contact on this site.'],
    ],
  },
  '/returns': {
    eyebrow: 'Customer information',
    title: 'Returns and exchanges',
    description: 'Please confirm the terms for your specific item before placing an order.',
    sections: [
      ['Before ordering', 'Product details, availability, and order terms can vary. Ask any questions you have and confirm the return or exchange terms with us before payment.'],
      ['If you need help', 'Message us with your order details and a description of the issue. Our team will explain the options available for your purchase.'],
      ['Current terms', 'Please message us before payment to confirm the return window, eligibility, and process for the item you are ordering.'],
    ],
  },
  '/privacy': {
    eyebrow: 'Customer information',
    title: 'Privacy',
    description: 'Here’s how the current site handles information you enter.',
    sections: [
      ['Consultation form', 'When you submit the consultation form, the details you entered are added to a WhatsApp message. This site does not send them to a Yummybaehair server.'],
      ['WhatsApp conversations', 'After you continue to WhatsApp, your conversation is handled by WhatsApp and is subject to its privacy terms. Share only information needed to handle your request.'],
      ['Newsletter', 'The newsletter form is a visual prototype and does not store or send email addresses yet. Connect an email service and confirm the final privacy wording before launch.'],
    ],
  },
  '/faq': {
    eyebrow: 'Customer information',
    title: 'Frequently asked questions',
    description: 'Quick answers to common questions. Message us if you need product-specific details.',
    sections: [
      ['How do I order?', 'Choose a category, open a style’s details, then message us on WhatsApp to confirm its current price, options, and availability.'],
      ['Which lengths, lace types, or shades are available?', 'Options vary by product. Ask us to confirm the current options and availability before ordering.'],
      ['How much is delivery?', 'Delivery fees and timing depend on your destination. Send us your location and we’ll confirm the details.'],
      ['Can I book a consultation?', 'Yes. Visit the consultation page, complete the form, and continue in WhatsApp to confirm timing and any costs.'],
      ['How should I care for my hair?', 'Use the hair-care guide for general tips, then ask us for instructions for your specific product.'],
    ],
  },
};

function CustomerInfoPage({ page }) {
  return <>
    <PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
    <section className="info-sections"><div className="wrap info-sections-grid">
      {page.sections.map(([heading, body], index) => <article key={heading}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{heading}</h2><p>{body}</p></div></article>)}
    </div><div className="wrap"><nav className="info-nav" aria-label="More customer information"><a href={appHref('/shipping')}>Shipping</a><a href={appHref('/payment')}>Payment</a><a href={appHref('/returns')}>Returns</a><a href={appHref('/faq')}>FAQs</a><a href={appHref('/privacy')}>Privacy</a></nav></div><div className="wrap info-help"><p>Need help with your order?</p><a className="button button-fill" href={whatsapp('Hi Yummybaehair, I have a question')}>Message Yummybaehair <Icon name="arrow-up-right" /></a></div></section>
  </>;
}

function ProductDetail({ product }) {
  const message = `Hi Yummybaehair, I'm interested in the ${product.name}. I saw the sample price is ${product.price}; please confirm the current price, available options, and availability.`;
  const photoUrl = product.image;
  const specs = [
    ['Texture', product.texture],
    ['Length', 'Ask us for current options'],
    ...(product.category === 'bundles' ? [] : [['Lace type', 'Ask us for available options']]),
    ['Colour', 'Ask us about available shades'],
    ['Availability', 'Please confirm before ordering'],
  ];

  return <>
    <PageIntro eyebrow="Product details" title={<>{product.name}</>} description="Ask us to confirm the current options and availability for this style." backHref={`/shop?category=${product.category}`} backLabel={categories.find((category) => category.slug === product.category)?.name.toLowerCase() || 'shop'} />
    <section className="product-detail"><div className="wrap product-detail-grid">
      <Photo src={photoUrl} alt={product.alt} className="detail-photo" position="center 25%" />
      <div className="detail-copy">
        <span className="eyebrow">Yummybaehair collection</span>
        <h2>{product.name}</h2>
        <strong className="detail-price">{product.price}</strong>
        <p className="price-preview-note">Sample price for preview only; please confirm the current price with us.</p>
        <p>Contact us to confirm the exact product options, current availability, and delivery details before ordering.</p>
        <dl className="product-specs">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className="detail-order-actions">
          <a className="button button-fill" href={whatsapp(message)}>Ask about this product <Icon name="arrow-up-right" /></a>
        </div>
        <a className="detail-back" href={appHref(`/shop?category=${product.category}`)}><Icon name="arrow-left" size={14} /> Back to {categories.find((category) => category.slug === product.category)?.name.toLowerCase() || 'the shop'}</a>
      </div>
    </div></section>
  </>;
}

function NotFoundPage() {
  return <>
    <PageIntro eyebrow="Oops, wrong turn" title={<>This page is having a <em>bad hair day.</em></>} description="The page you’re looking for isn’t here. Head back home and find your next look." />
    <div className="not-found-action"><a className="button button-fill" href={appHref('/')}>Back to home <Icon name="arrow-up-right" /></a></div>
  </>;
}

const routePages = {
  '/shop': { component: ShopPage, title: 'Shop' },
  '/collection': { component: CollectionPage, title: 'Collection' },
  '/hair-care': { component: HairCarePage, title: 'Hair Care' },
  '/reviews': { component: ReviewsPage, title: 'Reviews' },
  '/contact': { component: ContactPage, title: 'Contact' },
  '/consultation': { component: ConsultationPage, title: 'Consultation' },
  '/shipping': { component: () => <CustomerInfoPage page={customerInfo['/shipping']} />, title: 'Shipping' },
  '/payment': { component: () => <CustomerInfoPage page={customerInfo['/payment']} />, title: 'Payment' },
  '/returns': { component: () => <CustomerInfoPage page={customerInfo['/returns']} />, title: 'Returns and exchanges' },
  '/faq': { component: () => <CustomerInfoPage page={customerInfo['/faq']} />, title: 'FAQs' },
  '/privacy': { component: () => <CustomerInfoPage page={customerInfo['/privacy']} />, title: 'Privacy' },
};

function App() {
  const currentPath = currentRoute();
  const route = routePages[currentPath];
  const product = products.find((item) => currentPath === `/products/${item.slug}`);
  const title = currentPath === '/' ? 'Premium Hair, Made for You' : product?.name ?? route?.title ?? 'Page not found';

  useEffect(() => {
    document.title = `${title} | Yummybaehair`;
  }, [title]);

  const Page = route?.component;

  return <>
    <Header />
    {currentPath === '/' ? <HomePage /> : <main className="route-main">{product ? <ProductDetail product={product} /> : Page ? <Page /> : <NotFoundPage />}</main>}
    <Footer />
  </>;
}

export default App;
