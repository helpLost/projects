#ifndef SRC_UTILITIES_HPP
#define SRC_UTILITIES_HPP

    #include <iostream>
    #include <map>
    #include <chrono>
    #include <vector>
    #include <string>
    #include <cstring>
    #include <sstream>
    #include <fstream>

    #include <GLAD/glm.hpp>
    #include <GLAD/gtc/matrix_transform.hpp>
    #include <GLAD/glad.h>
    #include <GLFW/glfw3.h>

    namespace utl 
    {
        enum Switch { open, closed };
        enum Movement { forward, backward, right, left, up, down };

        inline int end(std::string message) { glfwTerminate(); if (!message.empty()) { throw std::runtime_error(message.c_str()); } return 0; }
    }

#endif