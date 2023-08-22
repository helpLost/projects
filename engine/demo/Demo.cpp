#include <Engine.hpp>
int main() 
{
    prj::Window *window = new prj::Window("Hello World", "leto.png", 1000, 500);
    while(!window->closed()) { window->update(); }
    utl::end("");
    return 0;
}