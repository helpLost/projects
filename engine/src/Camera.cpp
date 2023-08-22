#include <Camera.hpp>
namespace prj 
{
    void Camera::calculateNewFront()
    {
        glm::vec3 f;
        f.x = cos(glm::radians(c_Yaw)) * cos(glm::radians(c_Pitch));
        f.y = sin(glm::radians(c_Pitch));
        f.z = sin(glm::radians(c_Yaw)) * cos(glm::radians(c_Pitch));

        c_FRONT = glm::normalize(f); //? Normalize the vectors, because their length gets closer to 0 the more you look up or down which results in slower movement.
        c_RIGHT = glm::normalize(glm::cross(c_FRONT, c_WUP)); 
        c_UP    = glm::normalize(glm::cross(c_RIGHT, c_FRONT));
    }

    void Camera::kProcess(utl::Movement direction, float deltaTime)
    {
        float v = c_Speed * deltaTime;
        if (direction == utl::Movement::forward) { c_POS += c_FRONT * v; }
        if (direction == utl::Movement::backward) { c_POS -= c_FRONT * v; }
        if (direction == utl::Movement::left) { c_POS -= c_RIGHT * v; }
        if (direction == utl::Movement::right) { c_POS += c_RIGHT * v; }
        if (direction == utl::Movement::up) { c_POS += c_WUP * v; }
        if (direction == utl::Movement::down) { c_POS -= c_WUP * v; }
    }

    void Camera::mProcess(float xoffset, float yoffset)
    {
        c_Yaw += (xoffset *= c_Sensitivity); //? Update the angles.
        c_Pitch += (yoffset *= c_Sensitivity);

        //? This makes sure that when pitch is out of bounds, the screen doesn't get flipped.
        if (c_Pitch > 89.0f) { c_Pitch = 89.0f; }
        if (c_Pitch < -89.0f) { c_Pitch = -89.0f; }
        calculateNewFront();
    }

    void Camera::sProcess(float yoffset)
    {
        c_Zoom -= yoffset;
        if (c_Zoom < 1.0f) { c_Zoom = 1.0f; }
        if (c_Zoom > 30.0f) { c_Zoom = 30.0f; }
    }
}