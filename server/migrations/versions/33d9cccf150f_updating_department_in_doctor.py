"""updating department in Doctor

Revision ID: 33d9cccf150f
Revises: 9f41ef1691cc
Create Date: 2024-04-16 23:24:44.684047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33d9cccf150f'
down_revision = '9f41ef1691cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('doctors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('department_name', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('doctors', schema=None) as batch_op:
        batch_op.drop_column('department_name')

    # ### end Alembic commands ###