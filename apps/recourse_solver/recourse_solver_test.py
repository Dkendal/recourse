import recourse_solver

def handle_test():
  assert handle('ping', []) == 'pong'

def handle(name, args):
  msg = {'method' : name, 'args' : args}
  return recourse_solver.handle(msg)
