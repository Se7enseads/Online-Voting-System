"""
Seed the Online Voting App Database with Sample Data.

This script deletes all existing records from the tables.

Usage: clean the database.
"""

from app import app
from models import CandidateModel, UserModel, VotesModel, db

# Delete all existing records from the tables
with app.app_context():
    VotesModel.query.delete()
    UserModel.query.delete()
    CandidateModel.query.delete()
    db.session.commit()

# Add data to the database
with app.app_context():
    # Add data here, if needed
    db.session.commit()

print('Database seeded successfully.')
