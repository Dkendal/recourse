from pysolver import recourse_solver
import io

def test_handle():
    msg = {'method': 'ping', 'args': []}
    assert recourse_solver.handle(msg) == 'pong'


def test_read():
    file = io.open("test/fixtures/ping.txt", mode="rb")
    actual = recourse_solver.read(file)
    assert actual == {'method': 'ping', 'args': []}
