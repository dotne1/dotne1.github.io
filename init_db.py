from app import app, db
from app.models import CVE
from datetime import datetime

def init_db():
    with app.app_context():
        db.create_all()
        
        # Sample CVE data
        sample_cves = [
            {
                'cve_id': 'CVE-2025-27563',
                'description': 'In OpenHarmony v5.0.3 and prior versions allow a local attacker cause information leak through get permission.',
                'published_date': datetime(2025, 6, 8, 7, 15, 22),
                'severity': 'LOW',
                'cvss_score': 3.3,
                'source_url': 'https://nvd.nist.gov/vuln/detail/CVE-2025-27563',
                'status': 'ACTIVE'
            },
            {
                'cve_id': 'CVE-2025-27247',
                'description': 'In OpenHarmony v5.0.3 and prior versions allow a local attacker cause information leak through get permission.',
                'published_date': datetime(2025, 6, 8, 7, 15, 22),
                'severity': 'MEDIUM',
                'cvss_score': 5.5,
                'source_url': 'https://nvd.nist.gov/vuln/detail/CVE-2025-27247',
                'status': 'ACTIVE'
            }
        ]
        
        # Add sample CVEs to database
        for cve_data in sample_cves:
            cve = CVE(**cve_data)
            db.session.add(cve)
        
        db.session.commit()

if __name__ == '__main__':
    init_db()
    print("Database initialized with sample data.") 