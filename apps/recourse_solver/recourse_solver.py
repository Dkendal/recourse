import sys, msgpack

def ping():
  return "pong"

handlers = {
    "ping": ping
    }

def handle(msg):
  method = msg["method"]
  args = msg["args"]
  return handlers[method](*args)

def read():
  buffer_length = ord(sys.stdin.read(1))
  buff = sys.stdin.read(buffer_length)
  return msgpack.unpackb(buff)

def write(response):
  response = msgpack.packb(response)
  sys.stdout.write(response)
  sys.stdout.flush()

def main():
  msg = read()
  response = handle(msg)
  write(response)

main()
