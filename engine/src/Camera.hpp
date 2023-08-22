#ifndef SRC_CAMERA_HPP
#define SRC_CAMERA_HPP

    #include <Utilities.hpp>
    namespace prj
    {
        class Camera
        {
            private:
                glm::vec3 c_POS = glm::vec3(0.0f, 0.0f, 3.0f), c_FRONT = glm::vec3(0.0f, 0.0f, -1.0f), c_UP, c_RIGHT, c_WUP = glm::vec3(0.0f, 1.0f, 0.0f);
                void calculateNewFront();
            public:
                float c_Yaw = -90.0f, c_Pitch = 0.0f, c_Speed = 4.0f, c_Sensitivity = 0.1f, c_Zoom = 45.0f, c_LastX, c_LastY;
                bool c_Firstmouse = true;
                Camera(float x, float y) :c_LastX(x), c_LastY(y) { calculateNewFront(); }

                glm::mat4 GetViewMatrix() { return glm::lookAt(c_POS, c_POS + c_FRONT, c_UP);} //? Return a calculated view matrix.
                void kProcess(utl::Movement direction, float deltaTime), mProcess(float xoffset, float yoffset), sProcess(float yoffset);
        };
    }

#endif