#include <msgpack.hpp>
#include <iostream>

int main() {
  std::string buffer ("");
  do {
    std::getline(std::cin, buffer);
    std::cout << buffer << std::endl;
  } while (buffer.length() > 0);

  return 0;
}
