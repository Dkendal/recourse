import recourse_solver

def main():
  while True:
    msg = read()

    if msg == False:
      return 0

    response = handle(msg)
    write(response)

main()
