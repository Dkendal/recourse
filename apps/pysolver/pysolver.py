#!/home/dylan/.virtualenvs/recourse/bin/python
from pysolver import api


def main():
    with open(0, "rb") as stdin, open(1, "wb") as stdout, open(2, "wt") as stderr:
        while not stdin.closed and not stdout.closed:
            msg = api.read(stdin)
            response = api.handle(msg)
            api.write(stdout, response)

main()
