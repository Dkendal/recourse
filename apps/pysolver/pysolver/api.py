import sys
import msgpack
import struct
from .solver import Solver


def ping():
    return "pong"


def solve(sections):
    solver = Solver(sections)
    return solver.solve()


handlers = {
    "ping": ping,
    "solve": solve
    }


def handle(msg):
    method = msg["method"]
    args = msg["args"]
    return handlers[method](*args)


def read(file):
    length = file.read(2)
    (length,) = struct.unpack('!H', length)
    buff = file.read(length)
    return msgpack.unpackb(buff, encoding='utf-8')


def write(file, response):
    response = msgpack.packb(response)
    file.write(response)
    file.flush()
