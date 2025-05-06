from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from db.database import Base
import os

# Alembic Config object, provides access to .ini file values
config = context.config

# Setup logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Use SQLAlchemy models' metadata for autogeneration
target_metadata = Base.metadata

# Ensure Alembic gets the correct database URL from alembic.ini
config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL", "postgresql://postgres:Musawir@localhost:5432/doctors2"))

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata, render_as_batch=True
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
