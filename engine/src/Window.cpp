#include <Window.hpp>

void framebuffer_size_callback(GLFWwindow* window, int width, int height);  
namespace prj
{
    Window::Window(const char* title, int width, int height, float r, float g, float b)
        :w_TITLE(title), w_WIDTH(width), w_HEIGHT(height), w_BACKGROUND{ r, g, b }
    {
        if (w_WIDTH <= 50 || w_HEIGHT <= 25) { utl::end("Window dimensions impossible."); }
        if (w_TITLE == "") { utl::end("That's not a valid window title."); }
        if (!glfwInit()) { utl::end("GLFW failed to initialize. Please restart or repair the application files."); }

        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

        w_Window = glfwCreateWindow(w_WIDTH, w_HEIGHT, w_TITLE, NULL, NULL);
        if (w_Window == NULL) { utl::end("Window creation failed. Please restart the application."); }
        glfwMakeContextCurrent(w_Window);

        if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) { utl::end("GLAD failed to initialize. Please restart or repair the application files."); }
        glViewport(0, 0, w_WIDTH, w_HEIGHT);

        glfwSetFramebufferSizeCallback(w_Window, framebuffer_size_callback);
        w_CURRENTSCENE = 0;
    }

    void Window::update()
    {
        glfwGetFramebufferSize(w_Window, &w_WIDTH, &w_HEIGHT);
        w_SCENES[w_CURRENTSCENE].process();

        glfwPollEvents();
        render();
    }

    void Window::render()
    {
        glClearColor(w_BACKGROUND[0], w_BACKGROUND[1], w_BACKGROUND[2], 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        w_SCENES[w_CURRENTSCENE].draw();
        
        glfwSwapBuffers(w_Window);
    }
}
void framebuffer_size_callback(GLFWwindow* window, int width, int height) { glViewport(0, 0, width, height); }