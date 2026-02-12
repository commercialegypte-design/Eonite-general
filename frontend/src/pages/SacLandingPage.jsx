import React from 'react';

const SacLandingPage = () => {
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            <iframe
                src="/landing-sac.html"
                title="Sac Landing Page"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};

export default SacLandingPage;
