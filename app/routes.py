from flask import render_template, jsonify, request
from app import app, db
from app.models import CVE
from datetime import datetime

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about-me')
def about_me():
    return render_template('about-me.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/feeds')
def feeds():
    cves = CVE.query.order_by(CVE.published_date.desc()).all()
    return render_template('feeds.html', cves=cves)

@app.route('/api/cves')
def get_cves():
    cves = CVE.query.order_by(CVE.published_date.desc()).limit(50).all()
    return jsonify([cve.to_dict() for cve in cves])

@app.route('/api/cves/search')
def search_cves():
    query = request.args.get('q', '').lower()
    cves = CVE.query.filter(
        db.or_(
            CVE.cve_id.ilike(f'%{query}%'),
            CVE.description.ilike(f'%{query}%')
        )
    ).order_by(CVE.published_date.desc()).limit(50).all()
    return jsonify([cve.to_dict() for cve in cves]) 