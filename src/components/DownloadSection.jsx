import { useEffect, useRef, useState } from 'react';
import ColorBends from './ColorBends';
import { supabase } from '../lib/supabase';
import androidIcon from '../assets/android.png';

const SIZE_INFO = [
  { label: 'APK Size', value: '~80 MB' },
  { label: 'Android Version', value: 'Android 8.0+' },
  { label: 'Required Storage', value: '~80 MB' },
  { label: 'RAM Recommended', value: '2 GB+' },
  { label: 'Architecture', value: 'ARM64, x86_64' },
];

const CHIP_INFO = [
  { label: 'Android 8.0+', color: '#2563eb' },
  { label: 'Free to Install', color: '#ef4444' },
  { label: 'No Play Store Required', color: '#facc15' },
  { label: 'Secure APK', color: '#22c55e' },
  { label: 'Fast Setup', color: '#8b5cf6' },
];

export default function DownloadSection() {
  const [showGuide, setShowGuide] = useState(false);
  const [showPreRegister, setShowPreRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const headRef = useRef(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePreRegisterClick = () => {
    setShowPreRegister(true);
    setSubmitSuccess(false);
    setError('');
    setFormData({ name: '', email: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from('pre_registrations')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            registered_at: new Date().toISOString(),
          }
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      // Show success message
      setSubmitSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <>
      <section
        id="download"
        style={{
          background: '#050508',
          padding: '120px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* BG glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div
          ref={headRef}
          className="scroll-fade"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: '#7c3aed',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            Get the App
          </p>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#fff',
            margin: '0 0 16px',
          }}>
            Download Campus Mytra
          </h2>

          <p style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '460px',
            marginInline: 'auto',
            lineHeight: 1.7,
            marginBottom: '48px',
          }}>
            Available as an Android APK. Install in seconds and start competing with your campus.
          </p>

          {/* Main download button */}
          <button 
            onClick={handlePreRegisterClick}
            className="btn-silver-glass" 
            style={{ fontSize: '16px', padding: '16px 48px', cursor: 'pointer' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download APK Free <img src={androidIcon} alt="Android" style={{ width: '24px', height: '24px', marginLeft: '8px', verticalAlign: 'middle' }} />
          </button>

          {/* Size guide link */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setShowGuide(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.35)',
                fontSize: '13px',
                cursor: 'none',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                letterSpacing: '0.03em',
                transition: 'color 0.2s',
              }}
            >
              View Size Guide & Requirements
            </button>
          </div>

          {/* Platform chips */}
          <div style={{
            marginTop: '48px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {CHIP_INFO.map((chip) => (
              <div
                key={chip.label}
                style={{
                  background: `${chip.color}20`,
                  border: `1px solid ${chip.color}`,
                  borderRadius: '50px',
                  padding: '9px 18px',
                  fontSize: '15px',
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  boxShadow: `0 0 0 1px ${chip.color}30, 0 10px 24px ${chip.color}20`,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${chip.color}, 0 18px 36px ${chip.color}3d`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${chip.color}30, 0 10px 24px ${chip.color}20`;
                }}
              >
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      {showGuide && (
        <div
          className="modal-backdrop"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowGuide(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '18px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '22px',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '8px',
            }}>
              Size Guide & Requirements
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}>
              Before downloading, make sure your device meets these requirements.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SIZE_INFO.map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#c4b5fd' }}>{item.value}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="btn-silver-glass"
              style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
            >
              Download APK →
            </a>
          </div>
          
        </div>
        
      )}

      {/* Pre-Registration Modal */}
      {showPreRegister && (
        <div
          className="modal-backdrop"
          onClick={() => !submitSuccess && setShowPreRegister(false)}
        >
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '480px' }}
          >
            {/* Close */}
            {!submitSuccess && (
              <button
                onClick={() => setShowPreRegister(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '22px',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            )}

            {!submitSuccess ? (
              <>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px',
                }}>
                  Pre-Register for Early Access
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '28px',
                  lineHeight: 1.6,
                }}>
                  Be among the first to get Campus Mytra! Enter your details and we'll send you the APK as soon as it's ready.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Name Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '6px',
                    }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '6px',
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      fontSize: '13px',
                    }}>
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-silver-glass"
                    style={{
                      marginTop: '8px',
                      width: '100%',
                      justifyContent: 'center',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Pre-Register Now'}
                  </button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '12px',
                }}>
                  Welcome to Campus Mytra! 🎉
                </h3>
                
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '24px',
                  lineHeight: 1.7,
                }}>
                  Thank you for pre-registering! We'll send the APK to <strong style={{ color: '#c4b5fd' }}>{formData.email}</strong> very early. Get ready to compete with your campus!
                </p>

                <button
                  onClick={() => setShowPreRegister(false)}
                  className="btn-silver-glass"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  Got it!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </>
  );
}
