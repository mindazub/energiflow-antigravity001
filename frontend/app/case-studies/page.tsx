export default function CaseStudies() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Success Stories</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                See how leading organizations are saving energy with EnergiFlow.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div className="card" style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Global Tech Corp</h3>
                        <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', marginBottom: '1rem' }}>Data Centers</div>
                        <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                            "EnergiFlow helped us reduce our data center cooling costs by 35% within the first 3 months using their predictive AI models."
                        </p>
                        <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Read full story →</a>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Green City Initiative</h3>
                        <div style={{ display: 'inline-block', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', marginBottom: '1rem' }}>Public Infrastructure</div>
                        <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
                            "Optimization of street lighting across 5 districts resulted in saving over 1.2 GWh annually."
                        </p>
                        <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Read full story →</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
