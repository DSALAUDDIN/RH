'use client';

import { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, Video, LogOut, LayoutDashboard, CalendarDays, FileText, Settings, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const data = await res.json();
      setReviews(data.reviews);
    }
  };

  const handleLogout = async () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin');
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a video file.');
    
    setLoading(true);
    setMessage('Uploading video to Cloudinary... this may take a minute.');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok) {
        throw new Error(uploadData.error || 'Upload failed');
      }

      const videoUrl = uploadData.result.secure_url;

      setMessage('Video uploaded! Saving review to database...');

      const reviewRes = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient: patientName, rating, videoUrl }),
      });

      if (!reviewRes.ok) {
        throw new Error('Failed to save review data');
      }

      setMessage('Success! Review added.');
      setFile(null);
      setPatientName('');
      fetchReviews();

    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video? It will be removed from the database and Cloudinary.')) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      fetchReviews();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#0ea5e9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={18} color="#fff" />
            </div>
            RH Dental CMS
          </h2>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none', fontWeight: 500 }}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', backgroundColor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 }}>
            <Video size={20} /> Video Reviews
          </a>

          <div style={{ marginTop: '24px', marginBottom: '8px', paddingLeft: '16px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '1px' }}>
            Future Scopes
          </div>

          <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', color: '#64748b', textDecoration: 'none', fontWeight: 500, opacity: 0.7, cursor: 'not-allowed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarDays size={20} /> Appointments
            </div>
            <span style={{ fontSize: '0.65rem', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>SOON</span>
          </a>

          <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', color: '#64748b', textDecoration: 'none', fontWeight: 500, opacity: 0.7, cursor: 'not-allowed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={20} /> Blog Posts
            </div>
            <span style={{ fontSize: '0.65rem', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>SOON</span>
          </a>

          <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', color: '#64748b', textDecoration: 'none', fontWeight: 500, opacity: 0.7, cursor: 'not-allowed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Settings size={20} /> Settings
            </div>
            <span style={{ fontSize: '0.65rem', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>SOON</span>
          </a>
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid #1e293b' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Video Reviews</h1>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Manage patient testimonials and upload new success stories.</p>
          </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          
          {/* Upload Form */}
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', color: '#0f172a' }}>Upload New Review</h2>
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: '#475569', fontWeight: 600 }}>Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: '#475569', fontWeight: 600 }}>Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '8px', color: '#475569', fontWeight: 600 }}>Video File (MP4/WebM)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px dashed #94a3b8', backgroundColor: '#f8fafc', cursor: 'pointer' }}
                  required
                />
              </div>

              {message && (
                <div style={{ padding: '12px', backgroundColor: message.includes('Error') ? '#fee2e2' : '#dcfce7', color: message.includes('Error') ? '#991b1b' : '#166534', borderRadius: '8px', fontSize: '0.875rem' }}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#0ea5e9', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
              >
                <UploadCloud size={20} /> {loading ? 'Processing...' : 'Upload Review'}
              </button>
            </form>
          </div>

          {/* List of Reviews */}
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', color: '#0f172a' }}>Existing Reviews ({reviews.length})</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', alignItems: 'center' }}>
                  <div style={{ width: '120px', height: '70px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <video 
                      src={review.videoUrl} 
                      preload="metadata"
                      controls
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 600 }}>{review.patient}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#eab308' }}>
                      {Array(review.rating).fill(0).map((_, i) => <CheckCircle2 key={i} size={14} />)}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(review.id)}
                    style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    title="Delete Video"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              {reviews.length === 0 && (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>No reviews found. Upload one to get started.</p>
              )}
            </div>
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
