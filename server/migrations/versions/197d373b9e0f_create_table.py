"""create table

Revision ID: 197d373b9e0f
Revises: 
Create Date: 2024-04-18 14:07:40.460372

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '197d373b9e0f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('departments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('head_of_department', sa.String(), nullable=True),
    sa.Column('number_of_patients', sa.Integer(), nullable=True),
    sa.Column('number_of_doctors', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('doctors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('license_number', sa.String(), nullable=True),
    sa.Column('specialization', sa.String(), nullable=True),
    sa.Column('language_spoken', sa.String(), nullable=True),
    sa.Column('department_name', sa.String(), nullable=True),
    sa.Column('department_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_name', sa.String(), nullable=True),
    sa.Column('reason', sa.String(), nullable=True),
    sa.Column('doctor_name', sa.String(), nullable=True),
    sa.Column('datetime', sa.DateTime(), nullable=True),
    sa.Column('doctor_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('nurses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('license_number', sa.String(), nullable=True),
    sa.Column('language_spoken', sa.String(), nullable=True),
    sa.Column('doctor_id', sa.Integer(), nullable=True),
    sa.Column('department_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('contact', sa.String(), nullable=True),
    sa.Column('diagnosis', sa.String(), nullable=True),
    sa.Column('bed_number', sa.String(), nullable=True),
    sa.Column('doctor_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointment_patient_association',
    sa.Column('appointment_id', sa.Integer(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['appointment_id'], ['appointments.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], )
    )
    op.create_table('nurse_patient_association',
    sa.Column('nurse_id', sa.Integer(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['nurse_id'], ['nurses.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nurse_patient_association')
    op.drop_table('appointment_patient_association')
    op.drop_table('patients')
    op.drop_table('nurses')
    op.drop_table('appointments')
    op.drop_table('doctors')
    op.drop_table('users')
    op.drop_table('departments')
    # ### end Alembic commands ###