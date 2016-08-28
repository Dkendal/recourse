import sys, msgpack

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

def main():
  while True:
    msg = read()

    if msg == False:
      return 0

    response = handle(msg)
    write(response)

main()
