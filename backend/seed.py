"""
Seed the Voting App Database with Sample Data.

This script deletes all existing records from the tables and adds sample data to the database.

Usage: Run this script to seed the database with sample data.
"""

from app import app
from models import CandidateModel, UserModel, VotesModel, db

# Delete all existing records from the tables
with app.app_context():
    VotesModel.query.delete()
    UserModel.query.delete()
    CandidateModel.query.delete()
    db.session.commit()

# Create sample candidate data
candidates = [
    CandidateModel(candidate_num=1, first_name='Candidate1',
                   last_name='Last1', certificate='Cert1', position='President'),
    CandidateModel(candidate_num=2, first_name='Candidate2',
                   last_name='Last2', certificate='Cert2', position='President'),
    CandidateModel(candidate_num=3, first_name='Candidate3',
                   last_name='Last3', certificate='Cert3', position='Vice-President'),
    CandidateModel(candidate_num=4, first_name='Candidate4',
                   last_name='Last4', certificate='Cert4', position='Vice-President')
]

# Add data to the database
with app.app_context():
    for candidate in candidates:
        db.session.add(candidate)

    db.session.commit()

print('Database seeded successfully.')
