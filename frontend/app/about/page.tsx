export default function About() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>About EnergiFlow</h1>
            <div className="card" style={{ padding: '3rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--muted)' }}>
                    EnergiFlow was born from a simple idea: <strong>Energy data should be accessible, actionable, and beautiful.</strong>
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--muted)' }}>
                    We are a team of engineers, data scientists, and designers passionate about sustainability. Our mission is to accelerate the world's transition to efficient energy consumption by providing the best tools to understand usage patterns.
                </p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Our Values</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'grid', gap: '1rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)' }}>●</span> Transparency in every metric
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)' }}>●</span> Design first, complexity second
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)' }}>●</span> Sustainability at the core
                    </li>
                </ul>
            </div>
        </div>
    );
}
