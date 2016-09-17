import recourse_solver

def example_test():
    sections = {
            'section_a': {
                't1': {'m': (0, 2)},
                't2': {'m': (2, 4)},
                't3': {'m': (4, 6)},
                't4': {'m': (6, 8)},
                't5': {'m': (8, 10)}
                },
            'section_b': {
                't1': {'m': (0, 6)},
                't2': {'m': (2, 8)}
                },
            'section_c': {
                't1': {'w': (0, 6)},
                't2': {'w': (2, 8)}
                },
            'section_d': {
                't1': {'m': (0, 2), 'r': (0, 6)},
                't2': {'m': (2, 4), 'r': (2, 8)},
                't3': {'m': (14, 16), 'r': (14, 20)}
                }
            }
    model = recourse_solver.solve(sections)
    print(model)


def handle_test():
    msg = {'method': 'ping', 'args': []}
    assert recourse_solver.handle(msg) == 'pong'
