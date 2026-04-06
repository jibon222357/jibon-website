import { useState } from "react";

const categories = [
  { icon: "📱", name: "ইলেকট্রনিক্স", count: 1240 },
  { icon: "🚗", name: "গাড়ি/বাইক", count: 892 },
  { icon: "🏠", name: "বাড়ি/জমি", count: 654 },
  { icon: "👗", name: "পোশাক", count: 438 },
  { icon: "💼", name: "চাকরি", count: 320 },
  { icon: "🪑", name: "আসবাবপত্র", count: 278 },
  { icon: "📚", name: "বই/শিক্ষা", count: 195 },
  { icon: "🐾", name: "পোষা প্রাণী", count: 143 },
];

const ads = [
  { id: 1, title: "iPhone 14 Pro Max 256GB", price: "১,১০,০০০", location: "ঢাকা", time: "২ ঘন্টা আগে", category: "ইলেকট্রনিক্স", img: "📱", badge: "জরুরি" },
  { id: 2, title: "Honda CB150R ২০২২", price: "১,৮৫,০০০", location: "চট্টগ্রাম", time: "৫ ঘন্টা আগে", category: "গাড়ি/বাইক", img: "🏍️", badge: "" },
  { id: 3, title: "২ বেডরুম ফ্ল্যাট ভাড়া", price: "১৮,০০০/মাস", location: "সিলেট", time: "১ দিন আগে", category: "বাড়ি/জমি", img: "🏠", badge: "ফিচার্ড" },
  { id: 4, title: "Samsung 55\" 4K Smart TV", price: "৬৫,০০০", location: "রাজশাহী", time: "১ দিন আগে", category: "ইলেকট্রনিক্স", img: "📺", badge: "" },
  { id: 5, title: "সফটওয়্যার ইঞ্জিনিয়ার চাই", price: "৪৫,০০০–৭০,০০০", location: "ঢাকা", time: "২ দিন আগে", category: "চাকরি", img: "💼", badge: "নতুন" },
  { id: 6, title: "টিক টক বার্মিজ বিড়াল", price: "১৫,০০০", location: "ঢাকা", time: "৩ দিন আগে", category: "পোষা প্রাণী", img: "🐱", badge: "" },
  { id: 7, title: "সেগুন কাঠের খাট (King Size)", price: "৩৫,০০০", location: "কুমিল্লা", time: "৩ দিন আগে", category: "আসবাবপত্র", img: "🛏️", badge: "" },
  { id: 8, title: "HSC ও Admission গাইড বই সেট", price: "২,৫০০", location: "ময়মনসিংহ", time: "৪ দিন আগে", category: "বই/শিক্ষা", img: "📚", badge: "" },
];

const badgeColor = { "জরুরি": "#ef4444", "ফিচার্ড": "#f59e0b", "নতুন": "#10b981" };

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", location: "", category: "", desc: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [userAds, setUserAds] = useState([]);

  const allAds = [...userAds, ...ads];

  const filtered = allAds.filter(ad => {
    const matchSearch = ad.title.toLowerCase().includes(search.toLowerCase()) || ad.location.includes(search);
    const matchCat = activeCategory === "সব" || ad.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handlePost = () => {
    if (!form.title || !form.price || !form.location || !form.category) return;
    const newAd = { ...form, id: Date.now(), time: "এইমাত্র", img: "🏷️", badge: "নতুন" };
    setUserAds(prev => [newAd, ...prev]);
    setSubmitted(true);
    setTimeout(() => { setShowModal(false); setSubmitted(false); setForm({ title: "", price: "", location: "", category: "", desc: "", phone: "" }); }, 2000);
  };

  return (
    <div style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif", minHeight: "100vh", background: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding: "0 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, padding: "14px 0" }}>
          <div style={{ color: "#fff", fontSize: 26, fontWeight: 700, letterSpacing: -1, flexShrink: 0 }}>
            <span style={{ color: "#facc15" }}>জীবন</span>.কম
          </div>
          <div style={{ flex: 1, display: "flex", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="কী খুঁজছেন? যেমন: iPhone, বাইক, ফ্ল্যাট..."
              style={{ flex: 1, border: "none", outline: "none", padding: "12px 16px", fontSize: 15, fontFamily: "inherit" }}
            />
            <button style={{ background: "#facc15", border: "none", padding: "0 20px", cursor: "pointer", fontSize: 18 }}>🔍</button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: "#facc15", color: "#1e3a5f", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}
          >
            + বিজ্ঞাপন দিন
          </button>
        </div>

        {/* NAV CATS */}
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 6, paddingBottom: 12, overflowX: "auto" }}>
          {["সব", ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ background: activeCategory === cat ? "#facc15" : "rgba(255,255,255,0.15)", color: activeCategory === cat ? "#1e3a5f" : "#fff", border: "none", borderRadius: 20, padding: "5px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", fontWeight: activeCategory === cat ? 700 : 400 }}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>

        {/* HERO BANNER */}
        {activeCategory === "সব" && !search && (
          <div style={{ background: "linear-gradient(120deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "32px", marginBottom: 28, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>জীবন.কম — বাংলাদেশের সেরা ক্লাসিফাইড সাইট 🇧🇩</div>
              <div style={{ fontSize: 16, opacity: 0.85, marginBottom: 16 }}>লক্ষাধিক পণ্য, কোটি মানুষের বাজার</div>
              <button onClick={() => setShowModal(true)} style={{ background: "#facc15", color: "#1e3a5f", border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                এখনই বিজ্ঞাপন দিন — সম্পূর্ণ ফ্রি!
              </button>
            </div>
            <div style={{ fontSize: 80, opacity: 0.3 }}>🛒</div>
          </div>
        )}

        {/* CATEGORIES GRID */}
        {activeCategory === "সব" && !search && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e3a5f", marginBottom: 14 }}>ক্যাটাগরি</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
              {categories.map(cat => (
                <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                  style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: 12, padding: "16px 8px", cursor: "pointer", textAlign: "center", transition: "all 0.2s", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: 28 }}>{cat.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", marginTop: 6 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{cat.count.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ADS GRID */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e3a5f" }}>
              {search ? `"${search}" এর ফলাফল` : activeCategory === "সব" ? "সাম্প্রতিক বিজ্ঞাপন" : activeCategory}
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 400, marginLeft: 8 }}>({filtered.length}টি)</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16 }}>
              <div style={{ fontSize: 48 }}>😔</div>
              <div style={{ fontSize: 18, color: "#64748b", marginTop: 12 }}>কোনো বিজ্ঞাপন পাওয়া যায়নি</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {filtered.map(ad => (
                <div key={ad.id}
                  style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.2s", border: "1px solid #e2e8f0" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}>
                  <div style={{ height: 140, background: "linear-gradient(135deg, #eff6ff, #dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
                    {ad.img}
                    {ad.badge && (
                      <span style={{ position: "absolute", top: 10, left: 10, background: badgeColor[ad.badge] || "#6366f1", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, fontFamily: "inherit" }}>
                        {ad.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 4, lineHeight: 1.4 }}>{ad.title}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>৳ {ad.price}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
                      <span>📍 {ad.location}</span>
                      <span>🕐 {ad.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1e3a5f", color: "#94a3b8", textAlign: "center", padding: "20px", marginTop: 40, fontSize: 13 }}>
        © ২০২৫ জীবন.কম — বাংলাদেশের সেরা ক্লাসিফাইড মার্কেটপ্লেস 🇧🇩
      </footer>

      {/* POST AD MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56 }}>✅</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f", marginTop: 12 }}>বিজ্ঞাপন দেওয়া হয়েছে!</div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f", margin: 0 }}>বিজ্ঞাপন দিন</h2>
                  <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>✕</button>
                </div>
                {[
                  { label: "পণ্যের নাম *", key: "title", placeholder: "যেমন: Samsung Galaxy S24" },
                  { label: "দাম (৳) *", key: "price", placeholder: "যেমন: ৫০,০০০" },
                  { label: "এলাকা *", key: "location", placeholder: "যেমন: ঢাকা, মিরপুর" },
                  { label: "ফোন নম্বর", key: "phone", placeholder: "০১XXXXXXXXX" },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{field.label}</label>
                    <input
                      value={form[field.key]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = "#2563eb"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>ক্যাটাগরি *</label>
                  <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                    style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none" }}>
                    <option value="">ক্যাটাগরি বেছে নিন</option>
                    {categories.map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>বিবরণ</label>
                  <textarea
                    value={form.desc}
                    onChange={e => setForm(prev => ({ ...prev, desc: e.target.value }))}
                    placeholder="পণ্যের বিস্তারিত লিখুন..."
                    rows={3}
                    style={{ width: "100%", border: "2px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>
                <button onClick={handlePost}
                  style={{ width: "100%", background: "linear-gradient(135deg, #1e3a5f, #2563eb)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>
                  বিজ্ঞাপন প্রকাশ করুন 🚀
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
