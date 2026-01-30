export default function Pricing() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Simple, Transparent Pricing</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginBottom: '4rem', textAlign: 'center' }}>
                Choose the plan that best fits your energy management needs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Starter Plan */}
                <div className="card" style={{ border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Starter</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Free</p>
                    <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Perfect for individuals and small homes.</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li>✓ Real-time monitoring</li>
                        <li>✓ 1 User account</li>
                        <li>✓ Basic analytics</li>
                    </ul>
                    <a href="/register" className="btn btn-outline" style={{ width: '100%' }}>Get Started</a>
                </div>

                {/* Pro Plan */}
                <div className="card" style={{ border: '1px solid var(--primary)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', right: '2rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>MOST POPULAR</div>
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Pro</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>$29<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--muted)' }}>/mo</span></p>
                    <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Advanced features for businesses.</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li>✓ Everything in Starter</li>
                        <li>✓ 5 User accounts</li>
                        <li>✓ AI Insights</li>
                        <li>✓ Export data</li>
                    </ul>
                    <a href="/register" className="btn btn-primary" style={{ width: '100%' }}>Get Started</a>
                </div>

                {/* Enterprise Plan */}
                <div className="card" style={{ border: '1px solid var(--border)' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>Enterprise</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Custom</p>
                    <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>For large-scale infrastructure.</p>
                    <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li>✓ Everything in Pro</li>
                        <li>✓ Unlimited users</li>
                        <li>✓ Custom Integrations</li>
                        <li>✓ Dedicated Support</li>
                    </ul>
                    <a href="/contact" className="btn btn-outline" style={{ width: '100%' }}>Contact Sales</a>
                </div>
            </div>
        </div>
    );
}
