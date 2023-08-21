#ifndef SRC_WINDOW_HPP
#define SRC_WINDOW_HPP

#include <Utilities.hpp>
#include <Scene.hpp>
namespace prj
{
    class Camera
    {
        private:
        public:
    };

    class Window
    {
        private:
            int w_WIDTH, w_HEIGHT, w_CURRENTSCENE;
            float w_BACKGROUND[3];
            const char* w_TITLE;
            bool fps;

            std::vector<Camera> w_CAMERAS;
            std::vector<Scene> w_SCENES;

            utl::Switch input;
        public:
            GLFWwindow *w_Window;
            glm::vec2 dim() { return glm::vec2(w_WIDTH, w_HEIGHT); }
            glm::vec3 background() { return glm::vec3(w_BACKGROUND[0], w_BACKGROUND[1], w_BACKGROUND[2]); }

            Window(const char* title, int width, int height, float r, float g, float b);
            ~Window() { if (w_Window != NULL) { glfwDestroyWindow(w_Window); } }

            bool closed() { return glfwWindowShouldClose(w_Window); }
            void update(), render();
            void setBackground(float r, float g, float b) { w_BACKGROUND[0] = r; w_BACKGROUND[1] = g; w_BACKGROUND[2] = b; }
    };
    
}

#endif