export default function Features() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Features</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                Discover the powerful tools that make EnergiFlow the leading energy management platform.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>⚡</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Real-time Monitoring</h3>
                    <p style={{ color: 'var(--muted)' }}>Detailed breakdown of energy consumption by device and location.</p>
                </div>
                <div className="card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>📊</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Automated Reports</h3>
                    <p style={{ color: 'var(--muted)' }}>Receive daily, weekly, or monthly reports directly to your inbox.</p>
                </div>
                <div className="card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#a855f7' }}>🔔</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Smart Alerts</h3>
                    <p style={{ color: 'var(--muted)' }}>Get notified immediately when consumption spikes or anomalies are detected.</p>
                </div>
            </div>
        </div>
    );
}
