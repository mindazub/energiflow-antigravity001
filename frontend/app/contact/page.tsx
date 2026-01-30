export default function Contact() {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Get in Touch</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                    <p style={{ fontSize: '1.25rem', color: 'var(--muted)', marginBottom: '2rem' }}>
                        Have questions about our enterprise solutions or need support? We're here to help.
                    </p>

                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Contact Info</h3>
                        <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> support@energiflow.com</p>
                        <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>HQ:</strong> 123 Energy Way, Tech City, TC 90210</p>
                    </div>
                </div>

                <div className="card">
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label className="label">Name</label>
                            <input type="text" className="input" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="you@company.com" />
                        </div>
                        <div>
                            <label className="label">Message</label>
                            <textarea className="input" style={{ minHeight: '150px', resize: 'vertical' }} placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
