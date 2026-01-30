export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '5rem' }}>
      <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--primary)',
          borderRadius: '2rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          Revolutionizing Energy Efficiency
        </div>
        <h1 style={{ marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          Take Control of Your <br />
          <span style={{ color: 'var(--secondary)' }}>Energy Future</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Monitor, analyze, and optimize your energy consumption with real-time analytics and AI-driven insights.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Start Promoting Efficiency</a>
          <a href="#" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Learn More</a>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', paddingBottom: '4rem' }}>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>⚡</div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Real-time Monitoring</h3>
          <p style={{ color: 'var(--muted)' }}>Track your energy usage in real-time across all your devices and infrastructure.</p>
        </div>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>📊</div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Predictive Analytics</h3>
          <p style={{ color: 'var(--muted)' }}>Use advanced AI to forecast consumption trends and identify saving opportunities.</p>
        </div>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#a855f7' }}>🌱</div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Sustainability Goals</h3>
          <p style={{ color: 'var(--muted)' }}>Reduce your carbon footprint and achieve your organization's sustainability targets.</p>
        </div>
      </section>
    </div>
  );
}
