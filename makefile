all: elixir pysolver

PYTEST = /home/dylan/.virtualenvs/recourse/bin/pytest

elixir:
	mix test

pysolver:
	cd apps/pysolver && ${PYTEST}
