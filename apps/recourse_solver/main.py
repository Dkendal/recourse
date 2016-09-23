from lib import recourse_solver


def main():
    while True:
        msg = recourse_solver.read()

        if msg is False:
            return 0

        response = recourse_solver.handle(msg)
        recourse_solver.write(response)

main()
