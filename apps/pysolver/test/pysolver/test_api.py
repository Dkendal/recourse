from pysolver import api
import io


def test_handle():
    msg = {'method': 'ping', 'args': []}
    assert api.handle(msg) == 'pong'


def test_read():
    file = io.open("test/fixtures/ping.txt", mode="rb")
    actual = api.read(file)
    assert actual == {'method': 'ping', 'args': []}
