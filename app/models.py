from datetime import datetime
from app import db

class CVE(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cve_id = db.Column(db.String(20), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_date = db.Column(db.DateTime, nullable=False)
    severity = db.Column(db.String(10))
    cvss_score = db.Column(db.Float)
    source_url = db.Column(db.String(200))
    status = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'cve_id': self.cve_id,
            'description': self.description,
            'published_date': self.published_date.isoformat(),
            'severity': self.severity,
            'cvss_score': self.cvss_score,
            'source_url': self.source_url,
            'status': self.status
        } 