#include <Projects.hpp>
int main() 
{
    prj::Window *window = new prj::Window("Hello World", 1000, 500, 1.0f, 1.0f, 1.0f);
    while(!window->closed()) { window->update(); }

    return 0;
}