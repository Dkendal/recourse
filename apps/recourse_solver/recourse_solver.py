import sys, msgpack
from z3 import *
# from ortools.constraint_solver import pywrapcp

def example():
  s = Solver()
  # Range = Datatype('Range')
  # Range.declare('cons', ('start', IntSort()), ('end', IntSort()))
  # Range = Range.create()
  # x = Range.cons(1, 3)
  # y = Range.cons(2, 4)
  # z = Range.cons(3, 4)
  # a = Const('a', Range)
  # a = Const('a', Range)
  # s.add(a == x or a == y or a == z)
  # print(s.check())
  # print(s.model())

def ping():
  return "pong"

handlers = {
    "ping": ping,
    }

def handle(msg):
  method = msg["method"]
  args = msg["args"]
  return handlers[method](*args)

def read():
  buffer_length = sys.stdin.read(1)

  # end of program
  if len(buffer_length) == 0:
    return False

  buffer_length = ord(buffer_length)
  buff = sys.stdin.read(buffer_length)
  return msgpack.unpackb(buff)

def write(response):
  response = msgpack.packb(response)
  sys.stdout.write(response)
  sys.stdout.flush()
