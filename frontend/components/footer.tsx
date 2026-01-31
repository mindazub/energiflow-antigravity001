export function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--card-bg)',
            padding: '4rem 0 3rem 0',
            backdropFilter: 'blur(12px)'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            letterSpacing: '-0.05em',
                            background: 'linear-gradient(to right, var(--primary), var(--accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem',
                            display: 'inline-block',
                            backgroundClip: 'text'
                        }}>
                            EnergiFlow
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', maxWidth: '300px' }}>
                            Empowering the world to consume energy smarter, cheaper, and greener.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Product</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/features" style={{ transition: 'color 0.2s' }}>Features</a></li>
                            <li><a href="/pricing" style={{ transition: 'color 0.2s' }}>Pricing</a></li>
                            <li><a href="/case-studies" style={{ transition: 'color 0.2s' }}>Case Studies</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/about" style={{ transition: 'color 0.2s' }}>About Us</a></li>
                            <li><a href="/careers" style={{ transition: 'color 0.2s' }}>Careers</a></li>
                            <li><a href="/contact" style={{ transition: 'color 0.2s' }}>Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="#" style={{ transition: 'color 0.2s' }}>Privacy Policy</a></li>
                            <li><a href="#" style={{ transition: 'color 0.2s' }}>Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    color: '#64748b',
                    fontSize: '0.875rem'
                }}>
                    <div>© 2026 EnergiFlow Systems. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Social icons placeholders */}
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                        <span>GitHub</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
