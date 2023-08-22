#include <Window.hpp>
#define STB_IMAGE_IMPLEMENTATION
#include <STB/stb_image.h>
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include <STB/stb_image_write.h>


void framebuffer_size_callback(GLFWwindow* window, int width, int height);  
namespace prj
{
    Window::Window(const char* title, const char* icon, int width, int height)
        :w_TITLE(title), w_WIDTH(width), w_HEIGHT(height), w_BACKGROUND{ 1.0f, 1.0f, 1.0f }
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
        // glfwSetInputMode(w_Window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
        glfwSetWindowPos(w_Window, 20, 50);

        int imageChannels; //? RGB, RGBA, etc
        GLFWimage image[1]; std::string file = std::string("../src/res/images/") + icon;
        image[0].pixels = stbi_load(file.c_str(), &image[0].width, &image[0].height, &imageChannels, 0); 

        if (stbi_failure_reason()) { utl::end(std::string("Window icon load failed. Reason: ") + stbi_failure_reason()); }
        glfwSetWindowIcon(w_Window, 1, image);
        stbi_image_free(image[0].pixels);

        if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) { utl::end("GLAD failed to initialize. Please restart or repair the application files."); }
        glViewport(0, 0, w_WIDTH, w_HEIGHT);

        glfwSetFramebufferSizeCallback(w_Window, framebuffer_size_callback);
        // w_SHADERS[0] = {"default"}; //! FIX SHADER CLASS
    }

    void Window::calculateFrames()
    {
        float currentTime = static_cast<float>(glfwGetTime());
        w_DELTATIME = currentTime - w_LAST; w_LAST = currentTime;
        w_FPSCOUNTDURATION++;
        if (currentTime - w_FPSCOUNTSTART > 0.25 && w_FPSCOUNTDURATION > 10)
        {
            w_FPS = (double)w_FPSCOUNTDURATION / (currentTime - w_FPSCOUNTSTART);
            w_FPSCOUNTSTART = currentTime;
            w_FPSCOUNTDURATION = 0;
        }
        std::string title = std::string(w_TITLE) + " | " + std::to_string(w_FPS).substr(0, 5) + "FPS";
        glfwSetWindowTitle(w_Window, title.c_str());
    }
    void Window::handleInput()
    {

    }
    void Window::update()
    {
        glfwGetFramebufferSize(w_Window, &w_WIDTH, &w_HEIGHT);
        handleInput();
        calculateFrames();
        std::cout << "a";
        // w_SCENES[w_CURRENTSCENE].process(); //? Currently no scenes to process, so to prevent crashing we're gonna get rid of this.

        glfwPollEvents();
        render();
    }

    void Window::render()
    {
        glClearColor(w_BACKGROUND[0], w_BACKGROUND[1], w_BACKGROUND[2], 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // w_SCENES[w_CURRENTSCENE].draw();
        
        glfwSwapBuffers(w_Window);
    }
}
void framebuffer_size_callback(GLFWwindow* window, int width, int height) { glViewport(0, 0, width, height); }