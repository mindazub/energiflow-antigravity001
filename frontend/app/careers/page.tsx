export default function Careers() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>Join Our Team</h1>
            <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                Help us build the energy operating system of the future.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Senior Frontend Engineer</h3>
                        <p style={{ color: 'var(--muted)' }}>Remote • Engineering</p>
                    </div>
                    <button className="btn btn-primary">Apply Now</button>
                </div>

                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Energy Data Scientist</h3>
                        <p style={{ color: 'var(--muted)' }}>New York, NY • Data</p>
                    </div>
                    <button className="btn btn-primary">Apply Now</button>
                </div>

                <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Product Designer</h3>
                        <p style={{ color: 'var(--muted)' }}>Remote • Design</p>
                    </div>
                    <button className="btn btn-primary">Apply Now</button>
                </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
                Don't see your role? Email us at <a href="mailto:careers@energiflow.com" style={{ color: 'var(--primary)' }}>careers@energiflow.com</a>
            </div>
        </div>
    );
}
