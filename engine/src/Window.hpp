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
            int w_WIDTH, w_HEIGHT, w_CURRENTSCENE = 0, w_FPSCOUNTSTART, w_FPSCOUNTDURATION, w_FPS;
            float w_BACKGROUND[3], w_DELTATIME = 0.0f, w_LAST = 0.0f;
            const char* w_TITLE;
            bool displayFPS;

            std::vector<Camera> w_CAMERAS; std::vector<Shader> w_SHADERS; std::vector<Scene> w_SCENES;
            utl::Switch input;

            void calculateFrames(), handleInput();
        public:
            GLFWwindow *w_Window;
            glm::vec2 dim() { return glm::vec2(w_WIDTH, w_HEIGHT); }
            glm::vec3 background() { return glm::vec3(w_BACKGROUND[0], w_BACKGROUND[1], w_BACKGROUND[2]); }

            Window(const char* title, const char* icon, int width, int height);
            ~Window() { if (w_Window != NULL) { glfwDestroyWindow(w_Window); } }

            bool closed() { return glfwWindowShouldClose(w_Window); }
            void update(), render();
            void setBackground(float r, float g, float b) { w_BACKGROUND[0] = r; w_BACKGROUND[1] = g; w_BACKGROUND[2] = b; }
    };
    
}

#endif