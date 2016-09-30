#!/home/dylan/.virtualenvs/recourse/bin/python
from lib import recourse_solver


def main():
    with open(0, "rb") as stdin, open(1, "wb") as stdout, open(2, "wt") as stderr:
        while not stdin.closed and not stdout.closed:
            msg = recourse_solver.read(stdin)
            response = recourse_solver.handle(msg)
            recourse_solver.write(stdout, response)

main()
