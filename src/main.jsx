import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Play, Radio, Film, Trophy, Settings, Plus, X, Tv } from 'lucide-react';
import './style.css';

const starterChannels = [
  { id: 1, name: 'Arif Live TV', category: 'Featured', url: '', logo: '▶' },
  { id: 2, name: 'Live News', category: 'News', url: '', logo: 'N' },
  { id: 3, name: 'Sports Live', category: 'Sports', url: '', logo: 'S' },
  { id: 4, name: 'Movie Zone', category: 'Movies', url: '', logo: 'M' }
];

function App() {
  const [channels, setChannels] = useState(() => {
    try { return JSON.parse(localStorage.getItem('arif-channels')) || starterChannels; }
    catch { return starterChannels; }
  });
  const [active, setActive] = useState(channels[0]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [admin, setAdmin] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'News', url: '', logo: '' });

  const categories = ['All', 'News', 'Sports', 'Movies', 'Featured'];
  const visible = useMemo(() => channels.filter(c =>
    (category === 'All' || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  ), [channels, category, search]);

  function save(next) {
    setChannels(next);
    localStorage.setItem('arif-channels', JSON.stringify(next));
    if (active && !next.some(c => c.id === active.id)) setActive(next[0] || null);
  }
  function addChannel(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const next = [...channels, { ...form, id: Date.now(), logo: form.logo || form.name[0].toUpperCase() }];
    save(next);
    setForm({ name: '', category: 'News', url: '', logo: '' });
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark"><Tv size={22}/></span><span>ARIF <b>LIVE TV</b><small>ENTERTAINMENT HUB</small></span></a>
      <div className="top-actions"><span className="live-dot">LIVE EXPERIENCE</span><button className="icon-btn" onClick={() => setAdmin(!admin)} aria-label="Admin settings"><Settings size={19}/></button></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><i/> YOUR WORLD. YOUR ENTERTAINMENT.</span><h1>Entertainment<br/><em>without limits.</em></h1><p>Discover live television, sports and movies in one premium destination.</p><button className="primary-btn" onClick={() => document.getElementById('channels').scrollIntoView({ behavior: 'smooth' })}><Play size={16} fill="currentColor"/> Explore channels</button></div>
        <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-screen"><Radio size={48}/><span>ARIF</span><small>LIVE TV</small><div className="screen-line"/></div><div className="float-chip chip-one"><span/> ON AIR</div><div className="float-chip chip-two">4K EXPERIENCE</div></div>
      </section>

      {admin && <section className="admin-panel">
        <div className="section-heading"><div><span className="eyebrow">CONTROL CENTER</span><h2>Channel manager</h2></div><button className="icon-btn" onClick={() => setAdmin(false)}><X size={18}/></button></div>
        <p className="admin-note">এই ডেমোতে চ্যানেলগুলো এই ব্রাউজারেই সংরক্ষিত হবে। সব ডিভাইসে Sync করতে আলাদা backend/API configure করতে হবে।</p>
        <form className="admin-form" onSubmit={addChannel}>
          <input placeholder="Channel name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required/>
          <select value={form.category} onChange={e => setForm({...form, category:e.target.value})}><option>News</option><option>Sports</option><option>Movies</option><option>Featured</option></select>
          <input placeholder="Stream URL (optional)" value={form.url} onChange={e => setForm({...form, url:e.target.value})}/>
          <button className="primary-btn" type="submit"><Plus size={16}/> Add channel</button>
        </form>
        <div className="manage-list">{channels.map(c => <div key={c.id}><span>{c.name} <small>{c.category}</small></span><button onClick={() => save(channels.filter(x => x.id !== c.id))}><X size={16}/></button></div>)}</div>
      </section>}

      <section className="player-section">
        <div className="section-heading"><div><span className="eyebrow">NOW STREAMING</span><h2>Featured screen</h2></div><span className="status-pill"><i/> READY TO PLAY</span></div>
        <div className="player"><div className="player-glow"/><div className="player-content"><div className="play-orb"><Play size={26} fill="currentColor"/></div><h3>{active?.name || 'Choose a channel'}</h3><p>{active?.url ? 'Press play in your compatible player to start streaming.' : 'Select a channel with a valid stream URL to begin.'}</p>{active?.url && <a className="primary-btn" href={active.url} target="_blank" rel="noreferrer"><Play size={15}/> Open stream</a>}</div><span className="player-tag"><Radio size={14}/> PLAYER</span></div>
      </section>

      <section id="channels" className="channels-section">
        <div className="section-heading"><div><span className="eyebrow">PICK YOUR ENTERTAINMENT</span><h2>Explore channels</h2></div><label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search channels"/></label></div>
        <div className="filters">{categories.map(c => <button key={c} className={category===c?'selected':''} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="channel-grid">{visible.map(c => <button className={active?.id===c.id?'channel-card active':'channel-card'} key={c.id} onClick={() => setActive(c)}><span className="channel-logo">{c.logo}</span><span className="channel-info"><b>{c.name}</b><small>{c.category}</small></span><span className="card-play"><Play size={15} fill="currentColor"/></span></button>)}</div>
        {visible.length===0 && <p className="empty">No channels found. Try another search.</p>}
      </section>
    </main>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Tv size={18}/></span><span>ARIF <b>LIVE TV</b><small>ENTERTAINMENT HUB</small></span></a><span>© {new Date().getFullYear()} Arif Live TV · Built for entertainment</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);